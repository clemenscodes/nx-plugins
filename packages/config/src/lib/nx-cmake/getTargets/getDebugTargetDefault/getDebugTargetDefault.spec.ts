import {
    DEBUG_TARGET_NAME,
    DebugTargetConfiguration,
    getDebugTargetDefault,
} from './getDebugTargetDefault';

describe('DEBUG_TARGET_NAME', () => {
    it('should have the correct value', () => {
        expect(DEBUG_TARGET_NAME).toBe('debug');
    });
});

describe('getDebugTargetDefault', () => {
    let expectedConfiguration: DebugTargetConfiguration;

    beforeEach(() => {
        expectedConfiguration = {
            dependsOn: ['build'],
            inputs: ['default'],
        };
    });

    it('should return a DebugTargetConfiguration object with the correct structure', () => {
        const result = getDebugTargetDefault();
        expect(result).toEqual(expectedConfiguration);
    });

    it('should return a new object each time it is called', () => {
        const result1 = getDebugTargetDefault();
        const result2 = getDebugTargetDefault();
        expect(result1).not.toBe(result2);
    });
});
