import { getTestSetup } from './getTestSetup';

describe('getTestSetup', () => {
    it('should return the correct value when generateTests is true and language is C', () => {
        const result = getTestSetup(true, 'C', 'TestName');
        expect(result).toBe('add_test(UnitTests TestName)');
    });

    it('should return the correct value when generateTests is false and language is C', () => {
        const result = getTestSetup(false, 'C', 'TestName');
        expect(result).toBe('');
    });

    it('should return the correct value when generateTests is true and language is not C', () => {
        const result = getTestSetup(true, 'C++', 'TestName');
        expect(result).toBe('gtest_discover_tests(TestName)');
    });

    it('should return the correct value when generateTests is false and language is not C', () => {
        const result = getTestSetup(false, 'C++', 'TestName');
        expect(result).toBe('');
    });
});
