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
            projectNameAndRootFormat: 'derived',
            appsDir: 'bin',
            libsDir: 'packages',
            cmakeConfigDir: 'cmake',
            addClangPreset: true,
            skipFormat: false,
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
                build: {
                    dependsOn: ['^cmake', '^build', 'cmake'],
                    inputs: ['default'],
                },
                lint: { dependsOn: ['cmake'], inputs: ['default'] },
                test: { dependsOn: ['build'], inputs: ['default'] },
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
        } as NxJsonConfiguration;
    });

    it('should get updated nx.json', async () => {
        const [resultNxJson, resultOptions] = getUpdatedNxJson(
            mockNxJson,
            mockOptions
        );
        expect(resultNxJson).toStrictEqual(mockUpdatedNxJson);
        expect(resultOptions).toStrictEqual(mockOptions);
    });
});
