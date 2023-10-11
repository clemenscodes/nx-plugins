import {
    BUILD_TARGET_NAME,
    BuildTargetConfiguration,
    getBuildTargetDefault,
} from './getBuildTargetDefault';

describe('BUILD_TARGET_NAME', () => {
    it('should have the correct value', () => {
        expect(BUILD_TARGET_NAME).toBe('build');
    });
});

describe('getBuildTargetDefault', () => {
    let expectedConfiguration: BuildTargetConfiguration;

    beforeEach(() => {
        expectedConfiguration = {
            dependsOn: ['^cmake', '^build', 'cmake'],
            inputs: ['default'],
        };
    });

    it('should return a BuildTargetConfiguration object with the correct structure', () => {
        const result = getBuildTargetDefault();
        expect(result).toEqual(expectedConfiguration);
    });

    it('should return a new object each time it is called', () => {
        const result1 = getBuildTargetDefault();
        const result2 = getBuildTargetDefault();
        expect(result1).not.toBe(result2);
    });
});
