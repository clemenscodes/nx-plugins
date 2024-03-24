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
                'nx-cmake:fmt': {
                    dependsOn: [],
                    inputs: ['clangFormat'],
                },
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
                'nx-cmake:cmake': {},
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
        if (!updatedNxJson.targetDefaults['nx-cmake:cmake']) {
            updatedNxJson.targetDefaults['nx-cmake:cmake'] = {};
        }
        if (!expectedNxJson.targetDefaults['build']) {
            expectedNxJson.targetDefaults['build'] = {};
        }
        expectedNxJson.targetDefaults['build'] = {
            dependsOn: ['^build'],
        };
        updatedNxJson.targetDefaults['nx-cmake:cmake'].dependsOn = [
            'something else',
        ];
        expectedNxJson.targetDefaults['nx-cmake:cmake'].dependsOn = [
            'something else',
            '^nx-cmake:cmake',
        ];
        const result = addTargetDefaults(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });
});
