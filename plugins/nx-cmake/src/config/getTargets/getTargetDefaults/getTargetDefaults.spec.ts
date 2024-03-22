import type { TargetDefaults } from '..';
import { getTargetDefaults } from './getTargetDefaults';

describe('getTargetDefaults', () => {
    it('should return a TargetDefaults object with the correct structure', () => {
        const result = getTargetDefaults();
        const expectedDefaults: TargetDefaults = {
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
            'nx-cmake:execute': {
                dependsOn: ['nx-cmake:compile'],
                inputs: ['default'],
            },
            'nx-cmake:debug': {
                dependsOn: ['nx-cmake:compile'],
                inputs: ['default'],
            },
        };
        expect(result).toEqual(expectedDefaults);
    });
});
