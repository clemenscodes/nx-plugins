import type { CreateDependenciesContext } from '@nx/devkit';
import { createDependencies } from './createDependencies'; // Import your module
import * as filterProjectsModule from '../utils/graphUtils/filterProjects/filterProjects';
import * as getDependenciesModule from '../utils/graphUtils/getDependencies/getDependencies';

describe('createDependencies', () => {
    it('should return dependencies based on the provided context', () => {
        const context: CreateDependenciesContext = {
            nxJsonConfiguration: {
                workspaceLayout: {
                    appsDir: 'bin',
                    libsDir: 'bin',
                    projectNameAndRootFormat: 'as-provided',
                },
            },
            graph: {
                nodes: {
                    'testnx-cmake-test': {
                        name: 'testnx-cmake-test',
                        type: 'app',
                        data: {
                            name: 'testnx-cmake-test',
                            root: 'packages/nx-cmake-test/test',
                            sourceRoot: 'packages/nx-cmake-test/src/test',
                            projectType: 'application',
                            targets: {
                                cmake: {
                                    dependsOn: ['^cmake'],
                                    inputs: ['cmake'],
                                    executor: 'nx-cmake:cmake',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: {
                                            release: false,
                                            args: [],
                                        },
                                        production: { release: true, args: [] },
                                    },
                                    options: {},
                                },
                                build: {
                                    dependsOn: ['^build', 'cmake'],
                                    inputs: ['production', '^production'],
                                    executor: 'nx-cmake:build',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                lint: {
                                    executor: 'nx-cmake:lint',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                fmt: {
                                    executor: 'nx-cmake:format',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                test: {
                                    executor: 'nx-cmake:test',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                            },
                            $schema:
                                '../../../node_modules/nx/schemas/project-schema.json',
                            tags: ['c'],
                            implicitDependencies: [],
                        },
                    },
                    'libnx-cmake-test': {
                        name: 'libnx-cmake-test',
                        type: 'lib',
                        data: {
                            name: 'libnx-cmake-test',
                            root: 'packages/nx-cmake-test',
                            sourceRoot: 'packages/nx-cmake-test/src',
                            projectType: 'library',
                            targets: {
                                cmake: {
                                    dependsOn: ['^cmake'],
                                    inputs: ['cmake'],
                                    executor: 'nx-cmake:cmake',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: {
                                            release: false,
                                            args: [],
                                        },
                                        production: { release: true, args: [] },
                                    },
                                    options: {},
                                },
                                build: {
                                    dependsOn: ['^build', 'cmake'],
                                    inputs: ['production', '^production'],
                                    executor: 'nx-cmake:build',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                lint: {
                                    executor: 'nx-cmake:lint',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                fmt: {
                                    executor: 'nx-cmake:format',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                            },
                            $schema:
                                '../../node_modules/nx/schemas/project-schema.json',
                            tags: ['c'],
                            implicitDependencies: [],
                        },
                    },
                    'nx-cmake-test': {
                        name: 'nx-cmake-test',
                        type: 'app',
                        data: {
                            name: 'nx-cmake-test',
                            root: 'nx-cmake-test',
                            sourceRoot: 'nx-cmake-test/src',
                            projectType: 'application',
                            targets: {
                                cmake: {
                                    dependsOn: ['^cmake'],
                                    inputs: ['cmake'],
                                    executor: 'nx-cmake:cmake',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: {
                                            release: false,
                                            args: [],
                                        },
                                        production: { release: true, args: [] },
                                    },
                                    options: {},
                                },
                                build: {
                                    dependsOn: ['^build', 'cmake'],
                                    inputs: ['production', '^production'],
                                    executor: 'nx-cmake:build',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                lint: {
                                    executor: 'nx-cmake:lint',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                fmt: {
                                    executor: 'nx-cmake:format',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                debug: {
                                    dependsOn: ['build'],
                                    inputs: ['default'],
                                    executor: 'nx-cmake:debug',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                                execute: {
                                    dependsOn: ['build'],
                                    inputs: ['default'],
                                    executor: 'nx-cmake:execute',
                                    defaultConfiguration: 'development',
                                    configurations: {
                                        development: { args: [] },
                                        production: { args: [] },
                                    },
                                    options: {},
                                },
                            },
                            $schema:
                                '../node_modules/nx/schemas/project-schema.json',
                            tags: ['c'],
                            implicitDependencies: [],
                        },
                    },
                },
            },
        } as unknown as CreateDependenciesContext;

        const mockFilterProjects = jest.spyOn(
            filterProjectsModule,
            'filterProjects'
        );

        const mockGetDependencies = jest.spyOn(
            getDependenciesModule,
            'getDependencies'
        );

        const filteredProjectsReturnMock = [];
        const getDependenciesReturnMock = [];

        mockFilterProjects.mockReturnValue(filteredProjectsReturnMock);
        mockGetDependencies.mockReturnValue(getDependenciesReturnMock);

        const result = createDependencies(context);

        expect(result).toEqual(getDependenciesReturnMock);

        expect(mockFilterProjects).toHaveBeenCalledWith(context.graph.nodes);
        expect(mockGetDependencies).toHaveBeenCalledWith(
            context.nxJsonConfiguration.workspaceLayout,
            context,
            filteredProjectsReturnMock
        );

        mockFilterProjects.mockRestore();
        mockGetDependencies.mockRestore();
    });
});
