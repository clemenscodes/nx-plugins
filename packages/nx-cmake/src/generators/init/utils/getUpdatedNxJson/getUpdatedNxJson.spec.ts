import { getUpdatedNxJson } from './getUpdatedNxJson';
import { InitGeneratorSchema } from '../../schema';

describe('getUpdatedNxJson', () => {
    it('should get updated nx.json', async () => {
        const mockNxJson = {
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
        };
        const mockOptions: InitGeneratorSchema = {
            projectNameAndRootFormat: 'derived',
            appsDir: 'bin',
            libsDir: 'packages',
            cmakeConfigDir: 'cmake',
            addClangFormatPreset: true,
            skipFormat: false,
        };
        const mockUpdatedNxJson = {
            extends: 'nx/presets/npm.json',
            $schema: './node_modules/nx/schemas/nx-schema.json',
            defaultProject: 'nx-cmake',
            tasksRunnerOptions: {
                default: {
                    runner: 'nx-cloud',
                    options: {
                        cacheableOperations: [
                            'build',
                            'debug',
                            'test',
                            'lint',
                            'fmt',
                        ],
                    },
                },
            },
            pluginsConfig: { '@nx/js': { analyzeSourceFiles: true } },
            targetDefaults: {
                cmake: { dependsOn: ['^cmake'], inputs: ['cmake'] },
                build: { dependsOn: ['^build', 'cmake'], inputs: ['default'] },
                debug: { dependsOn: ['build'], inputs: ['default'] },
                execute: { dependsOn: ['build'], inputs: ['default'] },
            },
            namedInputs: {
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
                libsDir: 'packages',
                projectNameAndRootFormat: 'derived',
            },
        };
        const [resultNxJson, resultOptions] = getUpdatedNxJson(
            mockNxJson,
            mockOptions
        );
        expect(resultNxJson).toStrictEqual(mockUpdatedNxJson);
        expect(resultOptions).toStrictEqual(mockOptions);
    });
});
