import type { TargetDefaults } from '..';
import { getTargetDefaults } from './getTargetDefaults';

describe('getTargetDefaults', () => {
    it('should return a TargetDefaults object with the correct structure', () => {
        const result = getTargetDefaults();
        const expectedDefaults: TargetDefaults = {
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
            execute: {
                dependsOn: ['build'],
                inputs: ['default'],
            },
            debug: {
                dependsOn: ['build'],
                inputs: ['default'],
            },
        };
        expect(result).toEqual(expectedDefaults);
    });
});
