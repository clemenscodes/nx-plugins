import {
    hasValidExtension,
    generateExternalDependentFiles,
    getExternalFiles,
} from './getExternalFiles';

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

describe('generateExternalDependentFiles', () => {
    it('should generate dependent files for C files', () => {
        const files = generateExternalDependentFiles('file.h', 'c');
        expect(files).toEqual(['file.h', 'file.c']);
    });

    it('should generate dependent files for C++ files', () => {
        const files = generateExternalDependentFiles('file.h', 'cpp');
        expect(files).toEqual(['file.h', 'file.cpp']);
    });

    it('should not generate dependent files for non-header files', () => {
        const files = generateExternalDependentFiles('file.c', 'c');
        expect(files).toEqual(['file.c']);
    });
});

describe('getExternalFiles', () => {
    it('should return external files that start with "dist" or "include"', () => {
        const inputFiles = [
            'src/file1.h',
            'include/file2.h',
            'dist/file3.cpp',
            'external/file4.cpp',
        ];
        const root = 'src';
        const tag = 'cpp';
        const expectedOutput = [
            'include/file2.h',
            'dist/file3.cpp',
            'external/file4.cpp',
        ];
        const result = getExternalFiles(inputFiles, root, tag);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle empty input', () => {
        const inputFiles: string[] = [];
        const root = 'src';
        const tag = 'cpp';
        const expectedOutput: string[] = [];
        const result = getExternalFiles(inputFiles, root, tag);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle input with files starting with the root path', () => {
        const inputFiles = ['src/file1.h', 'src/file2.cpp', 'src/file3.c'];
        const root = 'src';
        const tag = 'cpp';
        const expectedOutput: string[] = [];
        const result = getExternalFiles(inputFiles, root, tag);
        expect(result).toEqual(expectedOutput);
    });

    it('should generate external dependent files based on the tag', () => {
        const inputFiles = ['file1.h', 'file2.c', 'file3.cpp'];
        const root = 'src';
        const tag = 'c';
        const expectedOutput = ['file1.h', 'file1.c', 'file2.c'];
        const result = getExternalFiles(inputFiles, root, tag);
        expect(result).toEqual(expectedOutput);
    });

    it('should generate external dependent files with ".cpp" tag by default', () => {
        const inputFiles = ['file1.h', 'file2.c', 'file3'];
        const root = 'src';
        const tag = 'cpp';
        const expectedOutput = ['file1.h', 'file1.cpp'];
        const result = getExternalFiles(inputFiles, root, tag);
        expect(result).toEqual(expectedOutput);
    });
});
