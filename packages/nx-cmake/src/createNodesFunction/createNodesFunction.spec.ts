import type { CreateNodesContext } from '@nx/devkit';
import { createNodesFunction } from './createNodesFunction';
import { CProjectType } from '../models/types';
import { getProjectConfiguration } from './../utils/generatorUtils/getProjectConfiguration/getProjectConfiguration';
import * as getProjectTypeModule from '../utils/generatorUtils/getProjectType/getProjectType';
import * as getProjectConfigurationModule from './../utils/generatorUtils/getProjectConfiguration/getProjectConfiguration';

describe('createNodesFunction', () => {
    let mockGetProjectType: jest.SpyInstance;
    let mockGetProjectConfiguration: jest.SpyInstance;
    let getProjectConfigurationReturnMock: ReturnType<
        typeof getProjectConfiguration
    >;
    let getProjectTypeReturnMock: CProjectType;
    let root: string;
    let projectConfigurationFile: string;
    let context: CreateNodesContext;

    beforeEach(() => {
        mockGetProjectType = jest.spyOn(getProjectTypeModule, 'getProjectType');
        mockGetProjectConfiguration = jest.spyOn(
            getProjectConfigurationModule,
            'getProjectConfiguration'
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
        getProjectTypeReturnMock = CProjectType.App;
        root = 'packages';
        projectConfigurationFile = `${root}/CMakeLists.txt`;
        context = {} as unknown as CreateNodesContext;
        mockGetProjectType.mockReturnValue(getProjectTypeReturnMock);
        mockGetProjectConfiguration.mockReturnValue(
            getProjectConfigurationReturnMock
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return nodes based on the provided project configuration file', () => {
        const result = createNodesFunction(projectConfigurationFile, context);
        expect(result).toEqual({ projects: getProjectConfigurationReturnMock });
        expect(mockGetProjectType).toHaveBeenCalledWith(
            projectConfigurationFile
        );
        expect(mockGetProjectConfiguration).toHaveBeenCalledWith(
            root,
            getProjectTypeReturnMock
        );
    });
});
