import {
    ProjectFileMap,
    CreateDependenciesContext,
    DependencyType,
} from '@nx/devkit';
import { FilteredProject } from '../../../models/types';
import {
    findDependencyFile,
    getDependenciesOfProject,
    shouldIgnoreExternalFile,
} from './getDependenciesOfProject';

describe('shouldIgnoreExternalFile', () => {
    it('should return true for external files starting with "include"', () => {
        expect(shouldIgnoreExternalFile('include/file.js')).toBe(true);
    });

    it('should return false for external files not starting with "include"', () => {
        expect(shouldIgnoreExternalFile('notinclude/file.js')).toBe(false);
    });
});

describe('findDependencyFile', () => {
    const fileMap: ProjectFileMap = {
        projectA: [
            { file: 'file1.js', hash: 'hash1' },
            { file: 'file2.js', hash: 'hash2' },
        ],
        projectB: [{ file: 'file3.js', hash: 'hash3' }],
    };

    const ctx: CreateDependenciesContext = {
        fileMap,
        graph: undefined,
        projectsConfigurations: undefined,
        nxJsonConfiguration: undefined,
        filesToProcess: undefined,
    };

    it('should find a dependency file', () => {
        const result = findDependencyFile('projectA', 'file1.js', ctx);
        expect(result).toEqual({ file: 'file1.js', hash: 'hash1' });
    });

    it('should return undefined for a non-existent dependency file', () => {
        const result = findDependencyFile('projectA', 'nonexistent.js', ctx);
        expect(result).toBeUndefined();
    });

    it('should return undefined if project is not part of ctx.fileMap', () => {
        const result = findDependencyFile('projectC', 'nonexistent.js', ctx);
        expect(result).toBeUndefined();
    });
});

describe('getDependenciesOfProject', () => {
    it('should return an array of ProjectGraphDependencyWithFile objects for valid dependencies', () => {
        const file1 = 'root/projectB/src/file1.c';
        const file2 = 'root/projectB/src/file2.c';
        const file3 = 'root/projectB/src/file3.c';
        const ctx: CreateDependenciesContext = {
            fileMap: {
                projectA: [],
                projectB: [
                    { file: file1, hash: 'hash1' },
                    { file: file2, hash: 'hash2' },
                    { file: file3, hash: 'hash2' },
                ],
            },
            graph: undefined,
            projectsConfigurations: undefined,
            nxJsonConfiguration: undefined,
            filesToProcess: undefined,
        };

        // Define sample FilteredProjects
        const projects: FilteredProject[] = [
            {
                name: 'projectA',
                root: 'root/projectA',
                type: 'app',
                tag: 'c',
            },
            {
                name: 'projectB',
                root: 'root/projectB',
                type: 'app',
                tag: 'cpp',
            },
        ];

        const externalFiles: string[] = [file1, file2];

        const result = getDependenciesOfProject(
            'projectA',
            externalFiles,
            ctx,
            projects
        );

        expect(result).toEqual([
            {
                source: 'projectA',
                target: 'projectB',
                sourceFile: file1,
                dependencyType: DependencyType.static,
            },
            {
                source: 'projectA',
                target: 'projectB',
                sourceFile: file2,
                dependencyType: DependencyType.static,
            },
        ]);
    });

    it('should ignore external files starting with "include"', () => {
        const file1 = 'root/projectB/src/file1.c';
        const file2 = 'root/projectB/src/file2.c';
        const ctx: CreateDependenciesContext = {
            fileMap: {
                projectA: [],
                projectB: [
                    { file: file1, hash: 'hash1' },
                    { file: file2, hash: 'hash2' },
                ],
            },
            graph: undefined,
            projectsConfigurations: undefined,
            nxJsonConfiguration: undefined,
            filesToProcess: undefined,
        };

        const projects: FilteredProject[] = [
            {
                name: 'projectA',
                root: 'root/projectA',
                type: 'app',
                tag: 'c',
            },
            {
                name: 'projectB',
                root: 'root/projectB',
                type: 'app',
                tag: 'cpp',
            },
        ];

        // External file with "include" prefix
        const externalFiles: string[] = ['include/file1.c', file2];

        const result = getDependenciesOfProject(
            'projectA',
            externalFiles,
            ctx,
            projects
        );

        // Only file2 should be considered as a dependency
        expect(result).toEqual([
            {
                source: 'projectA',
                target: 'projectB',
                sourceFile: file2,
                dependencyType: DependencyType.static,
            },
        ]);
    });

    it('should handle missing dependency files gracefully', () => {
        const file1 = 'root/projectB/src/file1.c';
        const ctx: CreateDependenciesContext = {
            fileMap: {
                projectA: [],
                projectB: [{ file: file1, hash: 'hash1' }],
            },
            graph: undefined,
            projectsConfigurations: undefined,
            nxJsonConfiguration: undefined,
            filesToProcess: undefined,
        };

        const projects: FilteredProject[] = [
            {
                name: 'projectA',
                root: 'root/projectA',
                type: 'app',
                tag: 'c',
            },
            {
                name: 'projectB',
                root: 'root/projectB',
                type: 'app',
                tag: 'cpp',
            },
        ];

        // External file that does not exist in projectB
        const externalFiles: string[] = ['file2.c'];

        const result = getDependenciesOfProject(
            'projectA',
            externalFiles,
            ctx,
            projects
        );

        // No dependencies should be added
        expect(result).toEqual([]);
    });

    it('should handle invalid project names gracefully', () => {
        const file1 = 'root/projectB/src/file1.c';
        const ctx: CreateDependenciesContext = {
            fileMap: {
                projectA: [],
                projectB: [{ file: file1, hash: 'hash1' }],
            },
            graph: undefined,
            projectsConfigurations: undefined,
            nxJsonConfiguration: undefined,
            filesToProcess: undefined,
        };

        const projects: FilteredProject[] = [
            {
                name: 'projectA',
                root: 'root/projectA',
                type: 'app',
                tag: 'c',
            },
            // Invalid project name with no matching fileMap entry
            {
                name: 'projectC',
                root: 'root/projectC',
                type: 'app',
                tag: 'cpp',
            },
        ];

        const externalFiles: string[] = ['file1.c'];

        const result = getDependenciesOfProject(
            'projectA',
            externalFiles,
            ctx,
            projects
        );

        // No dependencies should be added
        expect(result).toEqual([]);
    });

    it('should return an array of ProjectGraphDependencyWithFile objects for valid dependencies and update ctx', () => {
        const file1 = 'root/projectB/src/file1.c';
        const file2 = 'root/projectB/src/file2.c';
        const ctx: CreateDependenciesContext = {
            fileMap: {
                projectA: [],
                projectB: [
                    { file: file1, hash: 'hash1' },
                    { file: file2, hash: 'hash2' },
                ],
            },
            graph: undefined,
            projectsConfigurations: undefined,
            nxJsonConfiguration: undefined,
            filesToProcess: undefined,
        };

        // Define sample FilteredProjects
        const projects: FilteredProject[] = [
            {
                name: 'projectA',
                root: 'root/projectA',
                type: 'app',
                tag: 'c',
            },
            {
                name: 'projectB',
                root: 'root/projectB',
                type: 'app',
                tag: 'cpp',
            },
        ];

        const externalFiles: string[] = [file1, file2];

        const result = getDependenciesOfProject(
            'projectA',
            externalFiles,
            ctx,
            projects
        );

        // Assertions on the return value
        expect(result).toEqual([
            {
                source: 'projectA',
                target: 'projectB',
                sourceFile: file1,
                dependencyType: DependencyType.static,
            },
            {
                source: 'projectA',
                target: 'projectB',
                sourceFile: file2,
                dependencyType: DependencyType.static,
            },
        ]);

        // Assertions on the side effect (changes to ctx)
        expect(ctx.fileMap['projectA']).toEqual([
            {
                file: file1,
                hash: 'hash1',
            },
            {
                file: file2,
                hash: 'hash2',
            },
        ]);

        // Ensure ctx.fileMap['projectB'] remains unchanged
        expect(ctx.fileMap['projectB']).toEqual([
            {
                file: file1,
                hash: 'hash1',
            },
            {
                file: file2,
                hash: 'hash2',
            },
        ]);
    });
});
