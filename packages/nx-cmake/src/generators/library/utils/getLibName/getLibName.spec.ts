import { getLibName } from './getLibName';

describe('getLibName', () => {
    it('should prepend "lib" to the input string', () => {
        const input = 'myLib';
        const expected = 'libmyLib';

        const result = getLibName(input);

        expect(result).toBe(expected);
    });

    it('should handle empty input', () => {
        const input = '';
        const expected = 'lib';

        const result = getLibName(input);

        expect(result).toBe(expected);
    });

    it('should handle input with spaces', () => {
        const input = ' someLibraryName ';
        const expected = 'lib someLibraryName ';

        const result = getLibName(input);

        expect(result).toBe(expected);
    });
});
