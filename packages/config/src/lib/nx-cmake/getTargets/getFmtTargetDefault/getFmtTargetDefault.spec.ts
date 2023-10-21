import {
    FMT_TARGET_NAME,
    FmtTargetConfiguration,
    getFmtTargetDefault,
} from './getFmtTargetDefault';

describe('FMT_TARGET_NAME', () => {
    it('should have the correct value', () => {
        expect(FMT_TARGET_NAME).toBe('fmt');
    });
});

describe('getFmtTargetDefault', () => {
    let expectedConfiguration: FmtTargetConfiguration;

    beforeEach(() => {
        expectedConfiguration = {
            dependsOn: [],
            inputs: ['clangFormat'],
        };
    });

    it('should return a FmtTargetConfiguration object with the correct structure', () => {
        const result = getFmtTargetDefault();
        expect(result).toEqual(expectedConfiguration);
    });

    it('should return a new object each time it is called', () => {
        const result1 = getFmtTargetDefault();
        const result2 = getFmtTargetDefault();
        expect(result1).not.toBe(result2);
    });
});
