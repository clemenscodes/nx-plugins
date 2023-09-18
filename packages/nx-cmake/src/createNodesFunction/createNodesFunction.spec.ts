import type { CreateNodesContext } from '@nx/devkit';
import { createNodesFunction } from './createNodesFunction'; // Import your module
import { CProjectType } from '../models/types';
import * as getProjectTypeModule from '../utils/generatorUtils/getProjectType/getProjectType';
import * as getProjectConfiguration from './../utils/generatorUtils/getProjectConfiguration/getProjectConfiguration';

describe('createNodesFunction', () => {
    it('should return nodes based on the provided project configuration file', () => {
        const mockGetProjectType = jest.spyOn(
            getProjectTypeModule,
            'getProjectType'
        );

        const mockGetProjectConfiguration = jest.spyOn(
            getProjectConfiguration,
            'getProjectConfiguration'
        );

        const getProjectConfigurationReturnMock: ReturnType<
            typeof getProjectConfiguration.getProjectConfiguration
        > = {
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

        const getProjectTypeReturnMock = CProjectType.App;

        const root = 'packages';
        const projectConfigurationFile = `${root}/CMakeLists.txt`;
        const context: CreateNodesContext = {} as unknown as CreateNodesContext;

        mockGetProjectType.mockReturnValue(getProjectTypeReturnMock);
        mockGetProjectConfiguration.mockReturnValue(
            getProjectConfigurationReturnMock
        );

        const result = createNodesFunction(projectConfigurationFile, context);

        expect(result).toEqual({ projects: getProjectConfigurationReturnMock });
        expect(mockGetProjectType).toHaveBeenCalledWith(
            projectConfigurationFile
        );
        expect(mockGetProjectConfiguration).toHaveBeenCalledWith(
            root,
            getProjectTypeReturnMock
        );

        mockGetProjectType.mockRestore();
        mockGetProjectConfiguration.mockRestore();
    });
});
