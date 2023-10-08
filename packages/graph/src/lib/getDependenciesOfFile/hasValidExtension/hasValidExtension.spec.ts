import { hasValidExtension } from './hasValidExtension';

describe('hasValidExtension', () => {
    it('should return true for valid C files with tag "c"', () => {
        expect(hasValidExtension('file.c', 'c')).toBe(true);
    });

    it('should return true for valid C++ files with tag "cpp"', () => {
        expect(hasValidExtension('file.cpp', 'cpp')).toBe(true);
    });

    it('should return true for valid header files with any tag', () => {
        expect(hasValidExtension('file.h', 'c')).toBe(true);
        expect(hasValidExtension('file.h', 'cpp')).toBe(true);
    });

    it('should return false for files with invalid extensions', () => {
        expect(hasValidExtension('file.js', 'c')).toBe(false);
        expect(hasValidExtension('file.txt', 'cpp')).toBe(false);
    });
});
