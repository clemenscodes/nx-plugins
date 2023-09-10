import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { mkdirSync, rmSync } from 'fs';
import { ProjectGraph, readJsonFile } from '@nx/devkit';

type Graph = {
    graph: {
        nodes: ProjectGraph['nodes'];
        dependencies: ProjectGraph['dependencies'];
    };
};

describe('nx-cmake', () => {
    let projectDirectory: string;
    const projectName = 'nx-cmake-test';

    beforeAll(() => {
        projectDirectory = createTestProject();

        // The plugin has been built and published to a local registry in the jest globalSetup
        // Install the plugin built with the latest source code into the test repo
        execSync(`npm install nx-cmake@e2e`, {
            cwd: projectDirectory,
            stdio: 'inherit',
            env: {
                ...process.env,
                NX_DAEMON: 'false',
            },
        });
    });

    afterAll(() => {
        // Cleanup the test project
        rmSync(projectDirectory, {
            recursive: true,
            force: true,
        });
    });

    it('should be installed', () => {
        // npm ls will fail if the package is not installed properly
        execSync('npm ls nx-cmake', {
            cwd: projectDirectory,
            stdio: 'inherit',
        });
    });

    it('should initialize', async () => {
        const cmd = 'nx g nx-cmake:init --no-interactive';
        execSync(cmd, {
            cwd: projectDirectory,
            stdio: 'inherit',
            env: process.env,
        });
    });

    it('should generate binary', async () => {
        const cmd = `nx g nx-cmake:bin --name=${projectName} --language=C --no-interactive`;
        execSync(cmd, {
            cwd: projectDirectory,
            stdio: 'inherit',
            env: process.env,
        });
    });

    it('should process dependencies correctly', () => {
        const cmd = `nx graph --file=${projectDirectory}/graph.json`;
        execSync(cmd, {
            cwd: projectDirectory,
            stdio: 'inherit',
            env: { ...process.env, NX_DAEMON: 'false' },
        });
        const file: Graph = readJsonFile(`${projectDirectory}/graph.json`);
        const { graph } = file;
        expect(graph).toBeDefined();
        const projectLibName = `lib${projectName}`;
        const projectTestName = `test${projectName}`;
        const projectBinaryDeps = graph.dependencies[projectName];
        const projectTestDeps = graph.dependencies[projectTestName];
        expect(projectBinaryDeps).toStrictEqual([
            {
                source: projectName,
                target: projectLibName,
                type: 'static',
            },
        ]);
        expect(projectTestDeps).toStrictEqual([
            {
                source: projectTestName,
                target: projectLibName,
                type: 'static',
            },
        ]);
    });
});

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
function createTestProject() {
    const projectName = 'test-project';
    const projectDirectory = join(process.cwd(), 'tmp', projectName);

    // Ensure projectDirectory is empty
    rmSync(projectDirectory, {
        recursive: true,
        force: true,
    });
    mkdirSync(dirname(projectDirectory), {
        recursive: true,
    });

    execSync(
        `npx --yes create-nx-workspace@latest ${projectName} --preset apps --no-nxCloud --no-interactive`,
        {
            cwd: dirname(projectDirectory),
            stdio: 'inherit',
            env: process.env,
        }
    );
    console.log(`Created test project in "${projectDirectory}"`);

    return projectDirectory;
}
