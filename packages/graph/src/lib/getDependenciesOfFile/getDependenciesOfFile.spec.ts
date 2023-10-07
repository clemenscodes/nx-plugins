import type { RawProjectGraphDependency } from '@nx/devkit';
import { getDependenciesOfFile } from './getDependenciesOfFile';
import { FilteredProject } from '@/config';
import { DependencyType } from '@nx/devkit';

describe('getDependenciesOfFile', () => {
    let mainProject: FilteredProject;
    let file: string;
    let files: string[];
    let projects: FilteredProject[];
    let expectedDependencies: RawProjectGraphDependency[];

    beforeEach(() => {
        mainProject = {
            name: 'testa',
            root: 'packages/a/test',
            type: 2,
            tag: 'c',
            sourceRoot: 'packages/a/test/src',
        };
        file = 'packages/a/test/include/testa.h';
        files = ['packages/a/include/liba.h', 'packages/b/include/libb.h'];
        projects = [
            {
                name: 'testa',
                root: 'packages/a/test',
                type: 2,
                tag: 'c',
                sourceRoot: 'packages/a/test/src',
            },
            {
                name: 'testb',
                root: 'packages/b/test',
                type: 2,
                tag: 'c',
                sourceRoot: 'packages/b/test/src',
            },
            {
                name: 'libb',
                root: 'packages/b',
                type: 1,
                tag: 'c',
                sourceRoot: 'packages/b/src',
            },
            {
                name: 'liba',
                root: 'packages/a',
                type: 1,
                tag: 'c',
                sourceRoot: 'packages/a/src',
            },
            {
                name: 'b',
                root: 'bin/b',
                type: 0,
                tag: 'c',
                sourceRoot: 'bin/b/src',
            },
            {
                name: 'a',
                root: 'bin/a',
                type: 0,
                tag: 'c',
                sourceRoot: 'bin/a/src',
            },
        ];
        expectedDependencies = [
            {
                source: 'testa',
                target: 'liba',
                sourceFile: 'packages/a/test/include/testa.h',
                type: DependencyType.static,
            },
            {
                source: 'testa',
                target: 'libb',
                sourceFile: 'packages/a/test/include/testa.h',
                type: DependencyType.static,
            },
        ];
    });

    it('should get dependencies of file', () => {
        const result = getDependenciesOfFile(
            mainProject,
            file,
            files,
            projects,
        );
        expect(result).toStrictEqual(expectedDependencies);
    });
});