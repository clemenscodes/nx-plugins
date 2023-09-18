import { getTestName } from './getTestName';

describe('getTestName', () => {
    it('should prepend "test" to the input string', () => {
        const input = 'myFunction';
        const expected = 'testmyFunction';
        const result = getTestName(input);
        expect(result).toBe(expected);
    });

    it('should handle empty input', () => {
        const input = '';
        const expected = 'test';
        const result = getTestName(input);
        expect(result).toBe(expected);
    });

    it('should handle input with spaces', () => {
        const input = ' someTestCase ';
        const expected = 'test someTestCase ';
        const result = getTestName(input);
        expect(result).toBe(expected);
    });
});
