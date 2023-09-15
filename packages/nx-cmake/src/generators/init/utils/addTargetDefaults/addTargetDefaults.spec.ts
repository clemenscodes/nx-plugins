import { NxJsonConfiguration } from '@nx/devkit';
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
                build: {
                    dependsOn: ['^build', 'cmake'],
                    inputs: ['default'],
                },
                lint: {
                    dependsOn: ['cmake'],
                    inputs: ['default'],
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
                build: {
                    dependsOn: ['^build', 'cmake'],
                    inputs: ['default'],
                },
                lint: {
                    dependsOn: ['cmake'],
                    inputs: ['default'],
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
        const updatedNxJson = {};
        const result = addTargetDefaults(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should add target defaults for missing targets', () => {
        const updatedNxJson = {
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
        updatedNxJson.targetDefaults.cmake.dependsOn = ['something else'];
        expectedNxJson.targetDefaults.cmake.dependsOn = [
            'something else',
            '^cmake',
        ];
        const result = addTargetDefaults(updatedNxJson);
        expect(result).toEqual(expectedNxJson);
    });
});
