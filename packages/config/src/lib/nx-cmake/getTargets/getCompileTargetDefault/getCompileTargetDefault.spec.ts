import {
    COMPILE_TARGET_NAME,
    CompileTargetConfiguration,
    getCompileTargetDefault,
} from './getCompileTargetDefault';

describe('COMPILE_TARGET_NAME', () => {
    it('should have the correct value', () => {
        expect(COMPILE_TARGET_NAME).toBe('compile');
    });
});

describe('getCompileTargetDefault', () => {
    let expectedConfiguration: CompileTargetConfiguration;

    beforeEach(() => {
        expectedConfiguration = {
            dependsOn: ['^cmake', '^compile', 'cmake'],
            inputs: ['default'],
        };
    });

    it('should return a BuildTargetConfiguration object with the correct structure', () => {
        const result = getCompileTargetDefault();
        expect(result).toEqual(expectedConfiguration);
    });

    it('should return a new object each time it is called', () => {
        const result1 = getCompileTargetDefault();
        const result2 = getCompileTargetDefault();
        expect(result1).not.toBe(result2);
    });
});
