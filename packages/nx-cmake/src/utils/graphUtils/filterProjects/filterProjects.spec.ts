import type { ProjectGraphProjectNode } from '@nx/devkit';
import { filterProjects, filterTags, getTag, isC } from './filterProjects';
import { CProjectType } from '../../../models/types';
import { getProjectConfiguration } from '../../generatorUtils/getProjectConfiguration/getProjectConfiguration';

describe('isC', () => {
    it('should return true for "c" or "cpp"', () => {
        expect(isC('c')).toBe(true);
        expect(isC('cpp')).toBe(true);
    });

    it('should return false for other strings', () => {
        expect(isC('java')).toBe(false);
        expect(isC('python')).toBe(false);
    });
});

describe('filterTags', () => {
    it('should filter "c" and "cpp" tags', () => {
        const tags = ['c', 'cpp', 'java', 'python'];
        const filteredTags = filterTags(tags);
        const expectedFilteredTags = ['c', 'cpp'];

        expect(filteredTags).toEqual(expectedFilteredTags);
    });

    it('should handle an empty input array', () => {
        const tags: string[] = [];
        const filteredTags = filterTags(tags);
        const expectedFilteredTags: string[] = [];

        expect(filteredTags).toEqual(expectedFilteredTags);
    });

    it('should handle an array with no "c" or "cpp" tags', () => {
        const tags = ['java', 'python'];
        const filteredTags = filterTags(tags);
        const expectedFilteredTags: string[] = [];

        expect(filteredTags).toEqual(expectedFilteredTags);
    });
});

describe('getTag', () => {
    it('should return the first "c" or "cpp" tag', () => {
        const tags = ['java', 'c', 'python', 'cpp', 'rust'];
        const tag = getTag(tags);

        expect(tag).toBe('c');
    });

    it('should return undefined if no "c" or "cpp" tag is found', () => {
        const tags = ['java', 'python', 'rust'];
        const tag = getTag(tags);

        expect(tag).toBeUndefined();
    });

    it('should handle an empty input array', () => {
        const tags: string[] = [];
        const tag = getTag(tags);

        expect(tag).toBeUndefined();
    });
});

describe('filterProjects', () => {
    const project1 = getProjectConfiguration(
        'path/to/project1',
        CProjectType.App
    )['project1'];

    const project2 = getProjectConfiguration(
        'path/to/project2',
        CProjectType.Lib
    )['libproject2'];

    const mockNodes: Record<string, ProjectGraphProjectNode> = {
        project1: {
            type: 'app',
            name: 'project1',
            data: {
                ...project1,
                tags: ['c'],
            },
        },
        libproject2: {
            type: 'lib',
            name: 'libproject2',
            data: {
                ...project2,
                tags: ['cpp'],
            },
        },
    };

    it('should filter projects based on tags', () => {
        // Invoke the filterProjects function
        const filteredProjects = filterProjects(mockNodes);

        // Expected result based on filtering for 'c' and 'cpp' tags
        const expectedProjects = [
            {
                name: 'project1',
                root: 'path/to/project1',
                type: 'app',
                tag: 'c',
            },
            {
                name: 'libproject2',
                root: 'path/to/project2',
                type: 'lib',
                tag: 'cpp',
            },
        ];

        expect(filteredProjects).toEqual(expectedProjects);
    });

    it('should handle projects with no "c" or "cpp" tags', () => {
        // Modify the mockNodes to have a project with no "c" or "cpp" tag
        const project3 = getProjectConfiguration(
            'path/to/project3',
            CProjectType.Lib
        )['libproject3'];

        mockNodes['project3'] = {
            type: 'lib',
            name: 'project3',
            data: project3,
        };

        // Invoke the filterProjects function
        const filteredProjects = filterProjects(mockNodes);

        // Expected result is only project1 and project2
        const expectedProjects = [
            {
                name: 'project1',
                root: 'path/to/project1',
                type: 'app',
                tag: 'c',
            },
            {
                name: 'libproject2',
                root: 'path/to/project2',
                type: 'lib',
                tag: 'cpp',
            },
        ];

        expect(filteredProjects).toEqual(expectedProjects);
    });

    it('should handle projects with other tags', () => {
        // Modify the mockNodes to have a project with other tags
        const project4 = getProjectConfiguration(
            'path/to/project4',
            CProjectType.Lib
        )['libproject4'];

        mockNodes['project4'] = {
            type: 'lib',
            name: 'project4',
            data: {
                ...project4,
                tags: [
                    'js',
                    'ts',
                    'java',
                    'python',
                    'rust',
                    'best-language-ever',
                ],
            },
        };

        // Invoke the filterProjects function
        const filteredProjects = filterProjects(mockNodes);

        // Expected result is only project1 and project2
        const expectedProjects = [
            {
                name: 'project1',
                root: 'path/to/project1',
                type: 'app',
                tag: 'c',
            },
            {
                name: 'libproject2',
                root: 'path/to/project2',
                type: 'lib',
                tag: 'cpp',
            },
        ];

        expect(filteredProjects).toEqual(expectedProjects);
    });
});
