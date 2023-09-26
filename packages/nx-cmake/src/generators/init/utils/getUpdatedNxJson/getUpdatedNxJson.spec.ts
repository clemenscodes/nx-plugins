import type { InitGeneratorSchema } from '../../schema';
import type { NxJsonConfiguration } from '@nx/devkit';
import { getUpdatedNxJson } from './getUpdatedNxJson';

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

        mockOptions = {
            language: 'C',
            cmakeConfigDir: '.cmake',
            globalIncludeDir: 'include',
            appsDir: 'bin',
            libsDir: 'libs',
            addClangPreset: true,
        };

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
                            'build',
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
                    globalIncludeDir: 'include',
                    language: 'C',
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
                cmake: { dependsOn: ['^cmake'], inputs: ['cmake'] },
                build: {
                    dependsOn: ['^cmake', '^build', 'cmake'],
                    inputs: ['default'],
                },
                fmt: { dependsOn: [], inputs: ['clangFormat'] },
                lint: {
                    dependsOn: ['cmake'],
                    inputs: ['clangTidy'],
                },
                test: { dependsOn: ['build'], inputs: ['default'] },
                debug: { dependsOn: ['build'], inputs: ['default'] },
                execute: { dependsOn: ['build'], inputs: ['default'] },
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
