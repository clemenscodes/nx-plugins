import { filterGccDependencyOutput } from './filterGccDependencyOutput';

describe('filterGccDependencyOutput', () => {
    it('should filter and trim valid file lines from the output', () => {
        const inputOutput = `
            main.o
            src/file1.h
            src/file2.c
            src/file3.cpp
            /usr/include/stdio.h
            dist/file4.h
            dist/file5.o
            /usr/lib/libexample.a
        `;
        const expectedOutput = ['src/file2.c', 'src/file3.cpp'];
        const result = filterGccDependencyOutput(inputOutput, 'src/file1.h');
        expect(result).toEqual(expectedOutput);
    });

    it('should handle empty input', () => {
        const inputOutput = '';
        const expectedOutput: string[] = [];
        const result = filterGccDependencyOutput(
            inputOutput,
            'original/file1.c'
        );
        expect(result).toEqual(expectedOutput);
    });

    it('should handle input with no valid file lines', () => {
        const inputOutput = `
            /usr/include/stdio.h
            /usr/lib/libexample.a
        `;
        const expectedOutput: string[] = [];
        const result = filterGccDependencyOutput(
            inputOutput,
            'original/file.h'
        );
        expect(result).toEqual(expectedOutput);
    });

    it('should trim whitespace from file names', () => {
        const inputOutput = `
            src/file1.h
            src/file2.c
            src/file3.cpp
        `;
        const expectedOutput = ['src/file2.c', 'src/file3.cpp'];
        const result = filterGccDependencyOutput(inputOutput, 'src/file1.h');
        expect(result).toEqual(expectedOutput);
    });
});
