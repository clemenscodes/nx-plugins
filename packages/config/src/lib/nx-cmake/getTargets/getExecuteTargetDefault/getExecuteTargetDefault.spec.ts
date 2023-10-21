import {
    EXECUTE_TARGET_NAME,
    ExecuteTargetConfiguration,
    getExecuteTargetDefault,
} from './getExecuteTargetDefault';

describe('EXECUTE_TARGET_NAME', () => {
    it('should have the correct value', () => {
        expect(EXECUTE_TARGET_NAME).toBe('execute');
    });
});

describe('getExecuteTargetDefault', () => {
    let expectedConfiguration: ExecuteTargetConfiguration;

    beforeEach(() => {
        expectedConfiguration = {
            dependsOn: ['compile'],
            inputs: ['default'],
        };
    });

    it('should return an ExecuteTargetConfiguration object with the correct structure', () => {
        const result = getExecuteTargetDefault();
        expect(result).toEqual(expectedConfiguration);
    });

    it('should return a new object each time it is called', () => {
        const result1 = getExecuteTargetDefault();
        const result2 = getExecuteTargetDefault();
        expect(result1).not.toBe(result2);
    });
});
