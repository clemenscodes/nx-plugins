import type { CTag } from '@/types';
import { isValidProjectFile } from './isValidProjectFile';

describe('isValidProjectFile', () => {
    let file: string;
    let tag: CTag;

    beforeEach(() => {
        file = 'example.c';
        tag = 'c';
    });

    it('should return true if valid project file with C tag', () => {
        const result = isValidProjectFile(file, tag);
        expect(result).toBe(true);
    });

    it('should return true if valid project file with C++ tag', () => {
        file = 'example.hpp';
        tag = 'cpp';
        const result = isValidProjectFile(file, tag);
        expect(result).toBe(true);
    });

    it('should return false if file starts with "dist"', () => {
        file = 'dist/file.c';
        const result = isValidProjectFile(file, tag);
        expect(result).toBe(false);
    });

    it('should return false if file starts with "include"', () => {
        file = 'include/file.hpp';
        tag = 'cpp';
        const result = isValidProjectFile(file, tag);
        expect(result).toBe(false);
    });

    it('should return false if file has an invalid extension', () => {
        file = 'example.txt';
        const result = isValidProjectFile(file, tag);
        expect(result).toBe(false);
    });

    it('should return false if file has an invalid extension with C++ tag', () => {
        file = 'example.invalid';
        tag = 'cpp';
        const result = isValidProjectFile(file, tag);
        expect(result).toBe(false);
    });
});
