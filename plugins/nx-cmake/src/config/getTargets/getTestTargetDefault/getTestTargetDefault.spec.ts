import {
    TEST_TARGET_NAME,
    TestTargetConfiguration,
    getTestTargetDefault,
} from './getTestTargetDefault';

describe('TEST_TARGET_NAME', () => {
    it('should have the correct value', () => {
        expect(TEST_TARGET_NAME).toBe(`nx-cmake:test`);
    });
});

describe('getTestTargetDefault', () => {
    let expectedConfiguration: TestTargetConfiguration;

    beforeEach(() => {
        expectedConfiguration = {
            dependsOn: ['nx-cmake:compile'],
            inputs: ['default'],
        };
    });

    it('should return a TestTargetConfiguration object with the correct structure', () => {
        const result = getTestTargetDefault();
        expect(result).toEqual(expectedConfiguration);
    });

    it('should return a new object each time it is called', () => {
        const result1 = getTestTargetDefault();
        const result2 = getTestTargetDefault();
        expect(result1).not.toBe(result2);
    });
});
