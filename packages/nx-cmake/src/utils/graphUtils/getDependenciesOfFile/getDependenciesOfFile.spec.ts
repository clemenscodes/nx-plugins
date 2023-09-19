import {
    hasValidExtension,
    getDependenciesOfFile,
} from './getDependenciesOfFile';

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

describe('getDependenciesOfProject', () => {
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
            'src/file1.h',
            'src/file1.cpp',
            'include/file2.h',
            'dist/file3.cpp',
            'external/file4.cpp',
        ];
    });

    it('should handle empty input', () => {
        const inputFiles: string[] = [];
        const root = 'src';
        const tag = 'cpp';
        const expectedOutput: string[] = [];
    });

    it('should handle input with files starting with the root path', () => {
        const inputFiles = ['src/file1.h', 'src/file2.cpp', 'src/file3.c'];
        const root = 'src';
        const tag = 'cpp';
        const expectedOutput = [
            'src/file1.h',
            'src/file1.cpp',
            'src/file2.cpp',
        ];
    });

    it('should generate external dependent files based on the tag', () => {
        const inputFiles = ['file1.h', 'file2.c', 'file3.cpp'];
        const root = 'src';
        const tag = 'c';
        const expectedOutput = ['file1.h', 'file1.c', 'file2.c'];
    });

    it('should generate external dependent files with ".cpp" tag by default', () => {
        const inputFiles = ['file1.h', 'file2.c', 'file3'];
        const root = 'src';
        const tag = 'cpp';
        const expectedOutput = ['file1.h', 'file1.cpp'];
    });
});
