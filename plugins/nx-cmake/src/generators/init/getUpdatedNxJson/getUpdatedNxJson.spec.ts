import type { NxJsonConfiguration } from '@nx/devkit';
import { getUpdatedNxJson } from './getUpdatedNxJson';
import { InitGeneratorSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from '../getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';

describe('getUpdatedNxJson', () => {
    let mockNxJson: NxJsonConfiguration;
    let mockOptions: InitGeneratorSchema;
    let mockUpdatedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        mockNxJson = {
            extends: 'nx/presets/npm.json',
            $schema: './node_modules/nx/schemas/nx-schema.json',
            defaultProject: 'nx-cmake',
            tasksRunnerOptions: {
                default: {
                    runner: 'nx-cloud',
                },
            },
            pluginsConfig: {
                '@nx/js': {
                    analyzeSourceFiles: true,
                },
            },
        } as NxJsonConfiguration;

        mockOptions = getDefaultInitGeneratorOptions();

        mockUpdatedNxJson = {
            extends: 'nx/presets/npm.json',
            $schema: './node_modules/nx/schemas/nx-schema.json',
            defaultProject: 'nx-cmake',
            tasksRunnerOptions: {
                default: {
                    runner: 'nx-cloud',
                    options: {
                        cacheableOperations: [
                            'cmake',
                            'compile',
                            'test',
                            'lint',
                            'fmt',
                        ],
                    },
                },
            },
            pluginsConfig: {
                '@nx/js': { analyzeSourceFiles: true },
                'nx-cmake': {
                    cmakeConfigDir: '.cmake',
                    language: 'C',
                    workspaceName: 'workspace',
                },
            },
            generators: {
                'nx-cmake': {
                    binary: {
                        generateTests: true,
                        language: 'C',
                    },
                    library: {
                        generateTests: true,
                        language: 'C',
                    },
                },
            },
            targetDefaults: {
                'nx-cmake:cmake': {
                    dependsOn: ['^nx-cmake:cmake'],
                    inputs: ['cmake'],
                },
                'nx-cmake:compile': {
                    dependsOn: [
                        '^nx-cmake:cmake',
                        '^nx-cmake:compile',
                        'nx-cmake:cmake',
                    ],
                    inputs: ['default'],
                },
                'nx-cmake:fmt': { dependsOn: [], inputs: ['clangFormat'] },
                'nx-cmake:lint': {
                    dependsOn: ['nx-cmake:cmake'],
                    inputs: ['clangTidy'],
                },
                'nx-cmake:test': {
                    dependsOn: ['nx-cmake:compile'],
                    inputs: ['default'],
                },
                'nx-cmake:debug': {
                    dependsOn: ['nx-cmake:compile'],
                    inputs: ['default'],
                },
                'nx-cmake:execute': {
                    dependsOn: ['nx-cmake:compile'],
                    inputs: ['default'],
                },
            },
            namedInputs: {
                clangFormat: [
                    '{projectRoot}/.clang-format',
                    '{projectRoot}/.clang-format.yml',
                    '{projectRoot}/.clang-format.yaml',
                    '{workspaceRoot}/.clang-format',
                    '{workspaceRoot}/.clang-format.yml',
                    '{workspaceRoot}/.clang-format.yaml',
                ],
                clangTidy: [
                    '{projectRoot}/.clang-tidy',
                    '{projectRoot}/.clang-tidy.yml',
                    '{projectRoot}/.clang-tidy.yaml',
                    '{workspaceRoot}/.clang-tidy',
                    '{workspaceRoot}/.clang-tidy.yml',
                    '{workspaceRoot}/.clang-tidy.yaml',
                ],
                cmake: [
                    '{projectRoot}/**/*.cpp',
                    '{projectRoot}/**/*.hpp',
                    '{projectRoot}/**/*.c',
                    '{projectRoot}/**/*.h',
                    '{projectRoot}/CMakeLists.txt',
                    '{workspaceRoot}/CMakeLists.txt',
                    '{workspaceRoot}/cmake/**/*.cmake',
                ],
            },
            plugins: ['nx-cmake'],
            workspaceLayout: {
                appsDir: 'bin',
                libsDir: 'libs',
            },
        } as NxJsonConfiguration;
    });

    it('should get updated nx.json', async () => {
        const [resultNxJson, resultOptions] = getUpdatedNxJson(
            mockNxJson,
            mockOptions,
        );
        expect(resultNxJson).toStrictEqual(mockUpdatedNxJson);
        expect(resultOptions).toStrictEqual(mockOptions);
    });
});
