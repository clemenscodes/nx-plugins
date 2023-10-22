import { trimTest } from './trimTest';

describe('trimTest', () => {
    it('should remove "test" prefix from a string', () => {
        const input = 'testexample';
        const result = trimTest(input);
        expect(result).toBe('example');
    });

    it('should not modify a string without "test" prefix', () => {
        const input = 'example';
        const result = trimTest(input);
        expect(result).toBe('example');
    });

    it('should handle an empty string', () => {
        const input = '';
        const result = trimTest(input);
        expect(result).toBe('');
    });
});
