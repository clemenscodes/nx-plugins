import type { FilteredProject } from '../../models/types';
import { getProjectRootOfFile, getProjectFromFile } from './getProjectFromFile';

const projects: FilteredProject[] = [
    { name: 'project1', root: 'path/to/project1', type: 'app', tag: 'cpp' },
    { name: 'project2', root: 'path/to/project2', type: 'lib', tag: 'c' },
    { name: 'project3', root: 'path/to/project3', type: 'app', tag: 'cpp' },
];

describe('getProjectRootOfFile', () => {
    it('should return the correct project root when the file is in the "include" directory', () => {
        const file = 'path/to/project1/include/file.h';
        const expectedRoot = 'path/to/project1';
        const result = getProjectRootOfFile(file);
        expect(result).toEqual(expectedRoot);
    });

    it('should return the correct project root when the file is in the "src" directory', () => {
        const file = 'path/to/project2/src/file.c';
        const expectedRoot = 'path/to/project2';
        const result = getProjectRootOfFile(file);
        expect(result).toEqual(expectedRoot);
    });

    it('should return null when the file does not contain "include" or "src"', () => {
        const file = 'path/to/unknown/file.js';
        const result = getProjectRootOfFile(file);
        expect(result).toBeNull();
    });
});

describe('getProjectFromFile', () => {
    it('should return the correct project name for a file within a project', () => {
        const file = 'path/to/project1/include/file.h';
        const expectedProjectName = 'project1';
        const result = getProjectFromFile(file, projects);
        expect(result).toEqual(expectedProjectName);
    });

    it('should return null for a file outside of any project', () => {
        const file = 'path/not/in/any/project/file.js';
        const result = getProjectFromFile(file, projects);
        expect(result).toBeNull();
    });

    it('should return null when projects array is empty', () => {
        const file = 'path/to/project1/src/file.c';
        const result = getProjectFromFile(file, []);
        expect(result).toBeNull();
    });

    it('should handle multiple projects with the same root', () => {
        const file = 'path/to/project2/src/file.c';
        const expectedProjectName = 'project2';
        const result = getProjectFromFile(file, projects);
        expect(result).toEqual(expectedProjectName);
    });

    it('should fail to handle different file paths within a project', () => {
        const file = 'path/to/project3/dist/file.js';
        const result = getProjectFromFile(file, projects);
        expect(result).toBeNull();
    });
});
