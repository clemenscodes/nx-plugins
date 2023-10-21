import type { NxJsonConfiguration } from '@nx/devkit';
import { addTargetDefaults } from './addTargetDefaults';

describe('addTargetDefaults', () => {
    let updatedNxJson: NxJsonConfiguration;
    let expectedNxJson: NxJsonConfiguration;

    beforeEach(() => {
        updatedNxJson = {
            targetDefaults: {
                build: {
                    dependsOn: ['^build'],
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
                    dependsOn: ['compile'],
                    inputs: ['default'],
                },
                debug: {
                    dependsOn: ['compile'],
                    inputs: ['default'],
                },
                execute: {
                    dependsOn: ['compile'],
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

    it('should not remove existing targetDefaults', () => {
        const result = addTargetDefaults(updatedNxJson);
        if (!expectedNxJson.targetDefaults) {
            expectedNxJson.targetDefaults = {};
        }
        if (!expectedNxJson.targetDefaults['build']) {
            expectedNxJson.targetDefaults['build'] = {};
        }
        expectedNxJson.targetDefaults['build'] = {
            dependsOn: ['^build'],
        };
        expect(result).toEqual(expectedNxJson);
    });

    it('should add modify targetDefaults if defaults are not already present', () => {
        if (!expectedNxJson.targetDefaults) {
            expectedNxJson.targetDefaults = {};
        }
        if (!updatedNxJson.targetDefaults) {
            updatedNxJson.targetDefaults = {};
        }
        if (!updatedNxJson.targetDefaults['cmake']) {
            updatedNxJson.targetDefaults['cmake'] = {};
        }
        if (!expectedNxJson.targetDefaults['build']) {
            expectedNxJson.targetDefaults['build'] = {};
        }
        expectedNxJson.targetDefaults['build'] = {
            dependsOn: ['^build'],
        };
        updatedNxJson.targetDefaults['cmake'].dependsOn = ['something else'];
        expectedNxJson.targetDefaults['cmake'].dependsOn = [
            'something else',
            '^cmake',
        ];
        const result = addTargetDefaults(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });
});
