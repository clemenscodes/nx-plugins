import type { CreateNodesContext, ProjectConfiguration } from '@nx/devkit';
import type { C } from '@/types';
import { createNodesFunction } from './createNodesFunction';
import { CProjectType } from '@/types';
import * as utilsModule from '@/utils';

describe('createNodesFunction', () => {
    let mockGetProjectType: jest.SpyInstance;
    let mockGetProjectConfiguration: jest.SpyInstance;
    let getProjectConfigurationReturnMock: Record<string, ProjectConfiguration>;
    let getProjectTypeReturnMock: [CProjectType, C];
    let root: string;
    let options: unknown;
    let projectConfigurationFile: string;
    let context: CreateNodesContext;

    beforeEach(() => {
        mockGetProjectType = jest.spyOn(
            utilsModule,
            'getProjectTypeAndVariant',
        );
        mockGetProjectConfiguration = jest.spyOn(
            utilsModule,
            'getProjectConfiguration',
        );
        getProjectConfigurationReturnMock = {
            'nx-cmake-test': {
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
                tags: ['c'],
                implicitDependencies: [],
            },
        };
        getProjectTypeReturnMock = [CProjectType.App, 'C'];
        root = 'packages';
        projectConfigurationFile = `${root}/CMakeLists.txt`;
        context = {} as unknown as CreateNodesContext;
        mockGetProjectType.mockReturnValue(getProjectTypeReturnMock);
        mockGetProjectConfiguration.mockReturnValue(
            getProjectConfigurationReturnMock,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return nodes based on the provided project configuration file', () => {
        const result = createNodesFunction(
            projectConfigurationFile,
            options,
            context,
        );
        expect(result).toEqual({ projects: getProjectConfigurationReturnMock });
        expect(mockGetProjectType).toHaveBeenCalledWith(
            projectConfigurationFile,
        );
        expect(mockGetProjectConfiguration).toHaveBeenCalledWith(
            root,
            getProjectTypeReturnMock[0],
            getProjectTypeReturnMock[1],
        );
    });
});
