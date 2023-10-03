import type { FilteredProject } from '../../../models/types';
import { CProjectType } from '../../../models/types';
import { getProjectFromFile } from './getProjectFromFile';

describe('getProjectFromFile', () => {
    let projects: FilteredProject[];

    beforeEach(() => {
        projects = [
            {
                name: 'project1',
                root: 'path/to/project1',
                sourceRoot: 'path/to/project1',
                type: CProjectType.App,
                tag: 'cpp',
            },
            {
                name: 'project2',
                root: 'path/to/project2',
                sourceRoot: 'path/to/project2',
                type: CProjectType.Lib,
                tag: 'c',
            },
            {
                name: 'project3',
                root: 'path/to/project3',
                sourceRoot: 'path/to/project3',
                type: CProjectType.App,
                tag: 'cpp',
            },
            {
                name: 'project4',
                root: 'path/to/project4',
                sourceRoot: 'path/to/project4/src',
                type: CProjectType.App,
                tag: 'cpp',
            },
        ];
    });

    it('should return the correct project name for a file within a project', () => {
        const file = 'path/to/project1/include/file.h';
        const expectedProjectName = 'project1';
        const result = getProjectFromFile(file, projects);
        expect(result).toEqual(expectedProjectName);
    });

    it('should return the correct project name for a file in the root but not the source root', () => {
        const file = 'path/to/project4/file.h';
        const expectedProjectName = 'project4';
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

    it('should not fail to handle different file paths within a project', () => {
        const file = 'path/to/project3/dist/file.js';
        const expectedProjectName = 'project3';
        const result = getProjectFromFile(file, projects);
        expect(result).toBe(expectedProjectName);
    });
});
