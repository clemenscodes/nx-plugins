import type { ProjectGraph } from '@nx/devkit';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { mkdirSync, rmSync } from 'fs';
import { readJsonFile } from '@nx/devkit';

process.env.npm_config_registry = 'http://localhost:4873';

export type Graph = {
    graph: {
        nodes: ProjectGraph['nodes'];
        dependencies: ProjectGraph['dependencies'];
    };
};

const plugin = 'nx-cmake';

describe(plugin, () => {
    let projectDirectory: string;

    const execCmd = (cmd: string) => {
        execSync(cmd, {
            cwd: projectDirectory,
            stdio: 'inherit',
            env: { ...process.env, NX_DAEMON: 'false' },
        });
    };

    const generateGraph = (): Graph => {
        const cmd = `nx graph --file=${projectDirectory}/graph.json`;
        execCmd(cmd);
        const file: Graph = readJsonFile(`${projectDirectory}/graph.json`);
        return file;
    };

    const testExecutor = (executorName: string) => {
        describe(`${plugin}:${executorName}`, () => {
            let projectName: string;
            let cmd: string;
            let args: string;

            beforeEach(() => {
                projectName = 'nx-cmake-test-c';
                args = '--output-style=stream --verbose';
                cmd = `nx ${executorName} ${projectName} ${args}`;
            });

            it(`should run ${executorName} executor successfully`, () => {
                execCmd(cmd);
                execCmd(`nx ${executorName} lib${projectName} ${args}`);
                execCmd(`nx ${executorName} lib${projectName}-lib ${args}`);
                execCmd(`nx ${executorName} test${projectName} ${args}`);
                projectName = 'nx-cmake-test-cpp';
                execCmd((cmd = `nx ${executorName} ${projectName} ${args}`));
                execCmd(`nx ${executorName} lib${projectName} ${args}`);
                execCmd(`nx ${executorName} lib${projectName}-lib ${args}`);
                execCmd(`nx ${executorName} test${projectName} ${args}`);
            });
        });
    };

    beforeAll(() => {
        projectDirectory = createTestProject();

        // The plugin has been built and published to a local registry in the jest globalSetup
        // Install the plugin built with the latest source code into the test repo
        execCmd(`npm install ${plugin}@e2e`);
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
        execCmd(`npm ls ${plugin}`);
    });

    describe('generators', () => {
        let projectName: string;

        describe(`nx-cmake:init`, () => {
            it('should initialize', () => {
                const cmd = `nx g nx-cmake:init --no-interactive`;
                execCmd(cmd);
            });
        });

        describe('C generators', () => {
            beforeEach(() => {
                projectName = 'nx-cmake-test-c';
            });

            describe('nx-cmake:bin', () => {
                it('should generate C binary', () => {
                    const cmd = `nx g nx-cmake:bin --name=${projectName} --language=C --no-interactive`;
                    execCmd(cmd);
                });
            });

            describe('nx-cmake:lib', () => {
                it('should generate C library', () => {
                    projectName += '-lib';
                    const cmd = `nx g nx-cmake:lib --name=${projectName} --language=C --no-interactive`;
                    execCmd(cmd);
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
                it('should link C library', () => {
                    const cmd = `nx g nx-cmake:link --source=lib${projectName} --target=lib${projectName}-lib --no-interactive`;
                    execCmd(cmd);
                });
            });

            it('should process C dependencies correctly', () => {
                const { graph } = generateGraph();
                expect(graph).toBeDefined();
                const { dependencies } = graph;
                expect(dependencies).toBeDefined();
                const projectLibName = `lib${projectName}`;
                const projectTargetLibName = `lib${projectName}-lib`;
                const projectTestName = `test${projectName}`;
                const projectTargetTestName = `test${projectName}-lib`;
                const projectBinaryDeps = dependencies[projectName];
                const projectLibDeps = dependencies[projectLibName];
                const projectTargetLibDeps = dependencies[projectTargetLibName];
                const projectTestDeps = dependencies[projectTestName];
                const projectTargetTestDeps =
                    dependencies[projectTargetTestName];
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
                expect(projectLibDeps).toStrictEqual([
                    {
                        source: projectLibName,
                        target: projectTargetLibName,
                        type: 'static',
                    },
                ]);
                expect(projectTargetLibDeps).toStrictEqual([]);
                expect(projectTargetTestDeps).toStrictEqual([
                    {
                        source: projectTargetTestName,
                        target: projectTargetLibName,
                        type: 'static',
                    },
                ]);
            });
        });

        describe('C++ generators', () => {
            beforeEach(() => {
                projectName = 'nx-cmake-test-cpp';
            });

            describe('nx-cmake:bin', () => {
                it('should generate C++ binary', () => {
                    const cmd = `nx g nx-cmake:bin --name=${projectName} --language=C++ --no-interactive`;
                    execCmd(cmd);
                });
            });

            describe('nx-cmake:lib', () => {
                it('should generate C++ library', () => {
                    projectName += '-lib';
                    const cmd = `nx g ${plugin}:lib --name=${projectName} --language=C++ --no-interactive`;
                    execCmd(cmd);
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
                it('should link C++ library', () => {
                    const cmd = `nx g nx-cmake:link --source=lib${projectName} --target=lib${projectName}-lib --no-interactive`;
                    execCmd(cmd);
                });
            });

            it('should process C++ dependencies correctly', () => {
                const { graph } = generateGraph();
                expect(graph).toBeDefined();
                const { dependencies } = graph;
                expect(dependencies).toBeDefined();
                const projectLibName = `lib${projectName}`;
                const projectTargetLibName = `lib${projectName}-lib`;
                const projectTestName = `test${projectName}`;
                const projectTargetTestName = `test${projectName}-lib`;
                const projectBinaryDeps = dependencies[projectName];
                const projectLibDeps = dependencies[projectLibName];
                const projectTargetLibDeps = dependencies[projectTargetLibName];
                const projectTestDeps = dependencies[projectTestName];
                const projectTargetTestDeps =
                    dependencies[projectTargetTestName];
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
                expect(projectLibDeps).toStrictEqual([
                    {
                        source: projectLibName,
                        target: projectTargetLibName,
                        type: 'static',
                    },
                ]);
                expect(projectTargetLibDeps).toStrictEqual([]);
                expect(projectTargetTestDeps).toStrictEqual([
                    {
                        source: projectTargetTestName,
                        target: projectTargetLibName,
                        type: 'static',
                    },
                ]);
            });
        });
    });

    describe('executors', () => {
        let args: string;
        testExecutor('cmake');
        testExecutor('fmt');
        testExecutor('lint');
        testExecutor('compile');

        describe('nx-cmake:execute', () => {
            let projectName: string;
            let cmd: string;

            beforeEach(() => {
                projectName = 'nx-cmake-test-c';
                args = '--output-style=stream --verbose';
                cmd = `nx execute ${projectName} ${args}`;
            });

            it('should run nx-cmake:execute successfully', () => {
                execCmd(cmd);
                projectName = 'nx-cmake-test-cpp';
                execCmd(cmd);
            });
        });

        describe('nx-cmake:test', () => {
            let projectName: string;
            let cmd: string;

            beforeEach(() => {
                projectName = 'testnx-cmake-test-c';
                args = '--output-style=stream --verbose';
                cmd = `nx test ${projectName} ${args}`;
            });

            it('should run nx-cmake:test successfully', () => {
                execCmd(cmd);
                projectName = 'testnx-cmake-test-cpp';
                execCmd(cmd);
            });
        });

        describe('nx-cmake:debug', () => {
            let projectName: string;
            let cmd: string;

            beforeEach(() => {
                projectName = 'nx-cmake-test-c';
                args = '--output-style=stream --verbose';
                cmd = `nx debug ${projectName} ${args} --args=-ex=r,-ex=q`;
            });

            it('should run nx-cmake:debug successfully', () => {
                execCmd(cmd);
                projectName = 'nx-cmake-test-cpp';
                execCmd(cmd);
            });
        });
    });
});

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
function createTestProject() {
    const projectName = 'nx-cmake-test';
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
        `npx create-nx-workspace@latest ${projectName} --preset=${plugin} --ci=skip --interactive=false --verbose`,
        {
            cwd: dirname(projectDirectory),
            stdio: 'inherit',
            env: process.env,
        },
    );
    console.log(`Created test project in "${projectDirectory}"`);

    return projectDirectory;
}
