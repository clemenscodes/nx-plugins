import { getLanguageExtension } from './getLanguageExtension';

describe('getLanguageExtension', () => {
    it('should return "c" for input "C"', () => {
        const result = getLanguageExtension('C');
        expect(result).toBe('c');
    });

    it('should return "cpp" for input "C++"', () => {
        const result = getLanguageExtension('C++');
        expect(result).toBe('cpp');
    });
});
