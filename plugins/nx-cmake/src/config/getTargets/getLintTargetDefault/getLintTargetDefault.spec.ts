import {
    LINT_TARGET_NAME,
    LintTargetConfiguration,
    getLintTargetDefault,
} from './getLintTargetDefault';

describe('LINT_TARGET_NAME', () => {
    it('should have the correct value', () => {
        expect(LINT_TARGET_NAME).toBe('nx-cmake:lint');
    });
});

describe('getLintTargetDefault', () => {
    let expectedConfiguration: LintTargetConfiguration;

    beforeEach(() => {
        expectedConfiguration = {
            dependsOn: ['nx-cmake:cmake'],
            inputs: ['clangTidy'],
        };
    });

    it('should return a LintTargetConfiguration object with the correct structure', () => {
        const result = getLintTargetDefault();
        expect(result).toEqual(expectedConfiguration);
    });

    it('should return a new object each time it is called', () => {
        const result1 = getLintTargetDefault();
        const result2 = getLintTargetDefault();
        expect(result1).not.toBe(result2);
    });
});
