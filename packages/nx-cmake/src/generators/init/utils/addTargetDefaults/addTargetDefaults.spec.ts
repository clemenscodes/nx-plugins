import { addTargetDefaults } from './addTargetDefaults';

describe('addTargetDefaults', () => {
    it('should add target defaults when targetDefaults is missing', () => {
        const updatedNxJson = {};
        const expectedNxJson = {
            targetDefaults: {
                cmake: {
                    dependsOn: ['^cmake'],
                    inputs: ['cmake'],
                },
                build: {
                    dependsOn: ['^build', 'cmake'],
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

        const result = addTargetDefaults(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should add target defaults for missing targets', () => {
        const updatedNxJson = {
            targetDefaults: {
                cmake: {},
            },
        };
        const expectedNxJson = {
            targetDefaults: {
                cmake: {
                    dependsOn: ['^cmake'],
                    inputs: ['cmake'],
                },
                build: {
                    dependsOn: ['^build', 'cmake'],
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

        const result = addTargetDefaults(updatedNxJson);

        expect(result).toEqual(expectedNxJson);
    });

    it('should not modify targetDefaults if defaults are already present', () => {
        const updatedNxJson = {
            targetDefaults: {
                cmake: {
                    dependsOn: ['custom'],
                    inputs: ['custom-input'],
                },
                build: {
                    dependsOn: ['custom'],
                    inputs: ['custom-input'],
                },
                debug: {
                    dependsOn: ['custom'],
                    inputs: ['custom-input'],
                },
                execute: {
                    dependsOn: ['custom'],
                    inputs: ['custom-input'],
                },
            },
        };

        const result = addTargetDefaults(updatedNxJson);

        expect(result).toEqual(updatedNxJson);
    });
});
