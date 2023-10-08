import type { NxJsonConfiguration } from '@nx/devkit';
import { formatNxJson } from './formatNxJson';

describe('formatNxJson', () => {
    let nxJson: NxJsonConfiguration;
    let updatedNxJson: NxJsonConfiguration;
    let expectedFormattedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        nxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'nx/tasks-runners/default',
                },
            },
            pluginsConfig: { '@nx/js': { analyzeSourceFiles: true } },
            extends: 'nx/presets/npm.json',
            $schema: './node_modules/nx/schemas/nx-schema.json',
            defaultProject: 'nx-cmake',
            plugins: ['nx-cmake'],
            targetDefaults: {
                lint: {
                    inputs: [
                        'default',
                        '{workspaceRoot}/.eslintrc.json',
                        '{workspaceRoot}/.eslintignore',
                    ],
                },
                test: {
                    inputs: [
                        'default',
                        '^default',
                        '{workspaceRoot}/jest.preset.js',
                    ],
                },
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
            workspaceLayout: {
                appsDir: 'bin',
                libsDir: 'packages',
                projectNameAndRootFormat: 'as-provided',
            },
        } as NxJsonConfiguration;

        updatedNxJson = {
            tasksRunnerOptions: {
                default: {
                    runner: 'nx/tasks-runners/default',
                },
            },
            pluginsConfig: { '@nx/js': { analyzeSourceFiles: true } },
            extends: 'nx/presets/npm.json',
            $schema: './node_modules/nx/schemas/nx-schema.json',
            defaultProject: 'nx-cmake',
            plugins: ['nx-cmake'],
            targetDefaults: {
                lint: {
                    inputs: [
                        'default',
                        '{workspaceRoot}/.eslintrc.json',
                        '{workspaceRoot}/.eslintignore',
                    ],
                },
                test: {
                    inputs: [
                        'default',
                        '^default',
                        '{workspaceRoot}/jest.preset.js',
                    ],
                },
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
            workspaceLayout: {
                appsDir: 'bin',
                libsDir: 'packages',
                projectNameAndRootFormat: 'as-provided',
            },
        } as NxJsonConfiguration;

        expectedFormattedNxJson = {
            extends: 'nx/presets/npm.json',
            $schema: './node_modules/nx/schemas/nx-schema.json',
            defaultProject: 'nx-cmake',
            tasksRunnerOptions: {
                default: {
                    runner: 'nx/tasks-runners/default',
                },
            },
            pluginsConfig: { '@nx/js': { analyzeSourceFiles: true } },
            plugins: ['nx-cmake'],
            targetDefaults: {
                lint: {
                    inputs: [
                        'default',
                        '{workspaceRoot}/.eslintrc.json',
                        '{workspaceRoot}/.eslintignore',
                    ],
                },
                test: {
                    inputs: [
                        'default',
                        '^default',
                        '{workspaceRoot}/jest.preset.js',
                    ],
                },
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
            workspaceLayout: {
                appsDir: 'bin',
                libsDir: 'packages',
                projectNameAndRootFormat: 'as-provided',
            },
        } as NxJsonConfiguration;
    });

    it('should format NxJson by merging with updatedNxJson', () => {
        const result = formatNxJson(nxJson, updatedNxJson);
        expect(result).toEqual(expectedFormattedNxJson);
    });
});
