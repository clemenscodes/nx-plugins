import { isValidGccOutput } from './isValidGccOutput';

describe('isValidGccOutput', () => {
    let chunk: string;
    let originalFile: string;

    beforeEach(() => {
        chunk = 'example.c';
        originalFile = 'main.c';
    });

    it('should return true for valid GCC output', () => {
        const result = isValidGccOutput(chunk, originalFile);
        expect(result).toBe(true);
    });

    it('should return false if chunk is the same as the original file', () => {
        chunk = 'main.c';
        const result = isValidGccOutput(chunk, originalFile);
        expect(result).toBe(false);
    });

    it('should return false if chunk contains ".o"', () => {
        chunk = 'example.o';
        const result = isValidGccOutput(chunk, originalFile);
        expect(result).toBe(false);
    });

    it('should return false if chunk starts with "include/"', () => {
        chunk = 'include/header.h';
        originalFile = 'main.c';
        const result = isValidGccOutput(chunk, originalFile);
        expect(result).toBe(false);
    });

    it('should return false if chunk starts with "/usr/"', () => {
        chunk = '/usr/include/header.h';
        originalFile = 'main.c';
        const result = isValidGccOutput(chunk, originalFile);
        expect(result).toBe(false);
    });

    it('should return false if chunk starts with "dist/"', () => {
        chunk = 'dist/output.c';
        originalFile = 'main.c';
        const result = isValidGccOutput(chunk, originalFile);
        expect(result).toBe(false);
    });

    it('should return false if chunk does not have a valid file extension', () => {
        chunk = 'invalid.txt';
        originalFile = 'main.c';
        const result = isValidGccOutput(chunk, originalFile);
        expect(result).toBe(false);
    });
});
