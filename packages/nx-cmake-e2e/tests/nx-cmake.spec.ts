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
    const generateGraph = (): Graph => {
        const cmd = `nx graph --file=${projectDirectory}/graph.json`;
        execSync(cmd, {
            cwd: projectDirectory,
            stdio: 'inherit',
            env: { ...process.env, NX_DAEMON: 'false' },
        });
        const file: Graph = readJsonFile(`${projectDirectory}/graph.json`);
        return file;
    };

    let projectDirectory: string;

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

    describe('generators', () => {
        describe('nx-cmake:init', () => {
            it('should initialize', async () => {
                const cmd = 'nx g nx-cmake:init --no-interactive';
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
            });
        });

        describe('C generators', () => {
            let projectName: string;

            beforeEach(() => {
                projectName = 'nx-cmake-test-c';
            });

            describe('nx-cmake:bin', () => {
                it('should generate C binary', async () => {
                    const cmd = `nx g nx-cmake:bin --name=${projectName} --language=C --no-interactive`;
                    execSync(cmd, {
                        cwd: projectDirectory,
                        stdio: 'inherit',
                        env: process.env,
                    });
                });
            });

            describe('nx-cmake:lib', () => {
                it('should generate C library', async () => {
                    projectName += '-lib';
                    const cmd = `nx g nx-cmake:lib --name=${projectName} --language=C --no-interactive`;
                    execSync(cmd, {
                        cwd: projectDirectory,
                        stdio: 'inherit',
                        env: process.env,
                    });
                });
            });

            it('should process C dependencies correctly', () => {
                const { graph } = generateGraph();
                expect(graph).toBeDefined();
                const { dependencies } = graph;
                expect(dependencies).toBeDefined();
                const projectLibName = `lib${projectName}`;
                const projectTestName = `test${projectName}`;
                const projectBinaryDeps = dependencies[projectName];
                const projectTestDeps = dependencies[projectTestName];
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

            describe('nx-cmake:link', () => {
                it('should link C library', async () => {
                    const cmd = `nx g nx-cmake:link --source=lib${projectName} --target=lib${projectName}-lib --no-interactive`;
                    execSync(cmd, {
                        cwd: projectDirectory,
                        stdio: 'inherit',
                        env: process.env,
                    });
                });
            });

            it('should process C dependencies correctly', () => {
                const { graph } = generateGraph();
                expect(graph).toBeDefined();
                const { dependencies } = graph;
                expect(dependencies).toBeDefined();
                const projectLibName = `lib${projectName}`;
                const projectTestName = `test${projectName}`;
                const projectBinaryDeps = dependencies[projectName];
                const projectTestDeps = dependencies[projectTestName];
                expect(projectBinaryDeps).toStrictEqual([
                    {
                        source: projectName,
                        target: projectLibName,
                        type: 'static',
                    },
                    {
                        source: projectName,
                        target: projectLibName + '-lib',
                        type: 'static',
                    },
                ]);
                expect(projectTestDeps).toStrictEqual([
                    {
                        source: projectTestName,
                        target: projectLibName,
                        type: 'static',
                    },
                    {
                        source: projectTestName,
                        target: projectLibName + '-lib',
                        type: 'static',
                    },
                ]);
            });
        });

        describe('C++ generators', () => {
            let projectName: string;

            beforeEach(() => {
                projectName = 'nx-cmake-test-cpp';
            });

            describe('nx-cmake:bin', () => {
                it('should generate C++ binary', async () => {
                    const cmd = `nx g nx-cmake:bin --name=${projectName} --language=C++ --no-interactive`;
                    execSync(cmd, {
                        cwd: projectDirectory,
                        stdio: 'inherit',
                        env: process.env,
                    });
                });
            });

            describe('nx-cmake:lib', () => {
                it('should generate C++ library', async () => {
                    projectName += '-lib';
                    const cmd = `nx g nx-cmake:lib --name=${projectName} --language=C++ --no-interactive`;
                    execSync(cmd, {
                        cwd: projectDirectory,
                        stdio: 'inherit',
                        env: process.env,
                    });
                });
            });

            it('should process C++ dependencies correctly', () => {
                const { graph } = generateGraph();
                expect(graph).toBeDefined();
                const { dependencies } = graph;
                expect(dependencies).toBeDefined();
                const projectLibName = `lib${projectName}`;
                const projectTestName = `test${projectName}`;
                const projectBinaryDeps = dependencies[projectName];
                const projectTestDeps = dependencies[projectTestName];
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

            describe('nx-cmake:link', () => {
                it('should link C++ library', async () => {
                    const cmd = `nx g nx-cmake:link --source=lib${projectName} --target=lib${projectName}-lib --no-interactive`;
                    execSync(cmd, {
                        cwd: projectDirectory,
                        stdio: 'inherit',
                        env: process.env,
                    });
                });
            });

            it('should process C++ dependencies correctly', () => {
                const { graph } = generateGraph();
                expect(graph).toBeDefined();
                const { dependencies } = graph;
                expect(dependencies).toBeDefined();
                const projectLibName = `lib${projectName}`;
                const projectTestName = `test${projectName}`;
                const projectBinaryDeps = dependencies[projectName];
                const projectTestDeps = dependencies[projectTestName];
                expect(projectBinaryDeps).toStrictEqual([
                    {
                        source: projectName,
                        target: projectLibName,
                        type: 'static',
                    },
                    {
                        source: projectName,
                        target: projectLibName + '-lib',
                        type: 'static',
                    },
                ]);
                expect(projectTestDeps).toStrictEqual([
                    {
                        source: projectTestName,
                        target: projectLibName,
                        type: 'static',
                    },
                    {
                        source: projectTestName,
                        target: projectLibName + '-lib',
                        type: 'static',
                    },
                ]);
            });
        });
    });

    describe('executors', () => {
        describe('nx-cmake:cmake', () => {
            let projectName: string;
            let cmd: string;

            beforeEach(() => {
                projectName = 'nx-cmake-test-c';
                cmd = `nx cmake ${projectName}`;
            });

            it('should run cmake executor successfully', () => {
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
                cmd = `nx cmake lib${projectName} --skip-nx-cache`;
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
                cmd = `nx cmake lib${projectName}-lib --skip-nx-cache`;
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
                cmd = `nx cmake test${projectName} --skip-nx-cache`;
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
                projectName = 'nx-cmake-test-cpp';
                cmd = `nx cmake ${projectName} --skip-nx-cache`;
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
                cmd = `nx cmake lib${projectName} --skip-nx-cache`;
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
                cmd = `nx cmake lib${projectName}-lib --skip-nx-cache`;
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
                cmd = `nx cmake test${projectName} --skip-nx-cache`;
                execSync(cmd, {
                    cwd: projectDirectory,
                    stdio: 'inherit',
                    env: process.env,
                });
            });
        });
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
