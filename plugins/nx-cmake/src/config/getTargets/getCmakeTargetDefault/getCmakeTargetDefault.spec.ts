import {
    CMAKE_TARGET_NAME,
    CmakeTargetConfiguration,
    getCmakeTargetDefault,
} from './getCmakeTargetDefault';

describe('CMAKE_TARGET_NAME', () => {
    it('should have the correct value', () => {
        expect(CMAKE_TARGET_NAME).toBe('nx-cmake:cmake');
    });
});

describe('getCmakeTargetDefault', () => {
    let expectedConfiguration: CmakeTargetConfiguration;

    beforeEach(() => {
        expectedConfiguration = {
            dependsOn: ['^nx-cmake:cmake'],
            inputs: ['cmake'],
        };
    });

    it('should return a CmakeTargetConfiguration object with the correct structure', () => {
        const result = getCmakeTargetDefault();
        expect(result).toEqual(expectedConfiguration);
    });

    it('should return a new object each time it is called', () => {
        const result1 = getCmakeTargetDefault();
        const result2 = getCmakeTargetDefault();
        expect(result1).not.toBe(result2);
    });
});
