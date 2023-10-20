import type { NxJsonConfiguration } from '@nx/devkit';
import { addTargetDefaults } from './addTargetDefaults';

describe('addTargetDefaults', () => {
    let updatedNxJson: NxJsonConfiguration;
    let expectedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        updatedNxJson = {
            targetDefaults: {
                cmake: {
                    dependsOn: ['^cmake'],
                    inputs: ['cmake'],
                },
                compile: {
                    dependsOn: ['^cmake', '^compile', 'cmake'],
                    inputs: ['default'],
                },
                fmt: {
                    dependsOn: [],
                    inputs: ['clangFormat'],
                },
                lint: {
                    dependsOn: ['cmake'],
                    inputs: ['clangTidy'],
                },
                test: {
                    dependsOn: ['build'],
                    inputs: ['default'],
                },
                debug: {
                    dependsOn: ['build'],
                    inputs: ['default'],
                },
                execute: {
                    dependsOn: ['build'],
                    inputs: ['default'],
                },
            },
        };

        expectedNxJson = {
            targetDefaults: {
                cmake: {
                    dependsOn: ['^cmake'],
                    inputs: ['cmake'],
                },
                compile: {
                    dependsOn: ['^cmake', '^compile', 'cmake'],
                    inputs: ['default'],
                },
                fmt: {
                    dependsOn: [],
                    inputs: ['clangFormat'],
                },
                lint: {
                    dependsOn: ['cmake'],
                    inputs: ['clangTidy'],
                },
                test: {
                    dependsOn: ['build'],
                    inputs: ['default'],
                },
                debug: {
                    dependsOn: ['build'],
                    inputs: ['default'],
                },
                execute: {
                    dependsOn: ['build'],
                    inputs: ['default'],
                },
            },
        };
    });

    it('should add target defaults when targetDefaults is missing', () => {
        updatedNxJson = {};
        const result = addTargetDefaults(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add target defaults for missing targets', () => {
        updatedNxJson = {
            targetDefaults: {
                cmake: {},
            },
        };

        const result = addTargetDefaults(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should not modify targetDefaults if defaults are already present', () => {
        const result = addTargetDefaults(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });

    it('should add modify targetDefaults if defaults are not already present', () => {
        if (!expectedNxJson.targetDefaults) {
            expectedNxJson.targetDefaults = {};
        }
        if (!updatedNxJson.targetDefaults) {
            updatedNxJson.targetDefaults = {};
        }
        updatedNxJson.targetDefaults['cmake'].dependsOn = ['something else'];
        expectedNxJson.targetDefaults['cmake'].dependsOn = [
            'something else',
            '^cmake',
        ];
        const result = addTargetDefaults(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });
});
