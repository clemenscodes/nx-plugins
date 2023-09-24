import type {
    CreateDependenciesContext,
    ProjectConfiguration,
} from '@nx/devkit';
import { filterProjects } from './filterProjects';
import { CProjectType } from '../../../models/types';
import { getProjectConfiguration } from '../../generatorUtils/getProjectConfiguration/getProjectConfiguration';

describe('filterProjects', () => {
    let projects: CreateDependenciesContext['projects'];
    let project1: ProjectConfiguration;
    let project2: ProjectConfiguration;
    let project3: ProjectConfiguration;
    let project4: ProjectConfiguration;

    beforeEach(() => {
        project1 = getProjectConfiguration(
            'path/to/project1',
            CProjectType.App,
        )['project1'];
        project2 = getProjectConfiguration(
            'path/to/project2',
            CProjectType.Lib,
        )['libproject2'];

        project3 = getProjectConfiguration(
            'path/to/project3',
            CProjectType.Lib,
        )['libproject3'];
        project4 = getProjectConfiguration(
            'path/to/project4',
            CProjectType.Lib,
        )['libproject4'];
        projects = {
            project1: {
                ...project1,
                tags: ['c'],
            },
            libproject2: {
                ...project2,
                tags: ['cpp'],
            },
        };
    });

    it('should filter projects based on tags', () => {
        const filteredProjects = filterProjects(projects);
        const expectedProjects = [
            {
                name: 'project1',
                root: 'path/to/project1',
                sourceRoot: 'path/to/project1/src',
                type: CProjectType.App,
                tag: 'c',
            },
            {
                name: 'libproject2',
                root: 'path/to/project2',
                sourceRoot: 'path/to/project2/src',
                type: CProjectType.Lib,
                tag: 'cpp',
            },
        ];
        expect(filteredProjects).toEqual(expectedProjects);
    });

    it('should handle projects with no "c" or "cpp" tags', () => {
        projects['project3'] = project3;
        const filteredProjects = filterProjects(projects);
        const expectedProjects = [
            {
                name: 'project1',
                root: 'path/to/project1',
                sourceRoot: 'path/to/project1/src',
                type: CProjectType.App,
                tag: 'c',
            },
            {
                name: 'libproject2',
                root: 'path/to/project2',
                sourceRoot: 'path/to/project2/src',
                type: CProjectType.Lib,
                tag: 'cpp',
            },
        ];
        expect(filteredProjects).toEqual(expectedProjects);
    });

    it('should handle projects with other tags', () => {
        projects['project4'] = {
            ...project4,
            tags: ['js', 'ts', 'java', 'python', 'rust', 'best-language-ever'],
        };
        const filteredProjects = filterProjects(projects);
        const expectedProjects = [
            {
                name: 'project1',
                root: 'path/to/project1',
                sourceRoot: 'path/to/project1/src',
                type: CProjectType.App,
                tag: 'c',
            },
            {
                name: 'libproject2',
                root: 'path/to/project2',
                sourceRoot: 'path/to/project2/src',
                type: CProjectType.Lib,
                tag: 'cpp',
            },
        ];
        expect(filteredProjects).toEqual(expectedProjects);
    });
});
