import type { FilteredProject, WorkspaceLayout } from '../../../models/types';
import type {
    ProjectFileMap,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import { DependencyType } from '@nx/devkit';
import { CProjectType } from '../../../models/types';
import { getDependencies } from './getDependencies';
import * as filterDependenciesOfProjectModule from '../filterDependenciesOfProject/filterDependenciesOfProject';

describe('getDependencies', () => {
    let filesToProcess: ProjectFileMap;
    let projects: FilteredProject[];
    let workspaceLayout: WorkspaceLayout;
    let expectedDependencies: ProjectGraphDependencyWithFile[];
    let filterDependenciesOfProjectMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceLayout = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'as-provided',
        };
        projects = [
            {
                name: 'testparser',
                root: 'packages/parser/test',
                type: CProjectType.Test,
                tag: 'c',
                sourceRoot: 'packages/parser/test/src',
            },
            {
                name: 'libparser',
                root: 'packages/parser',
                type: CProjectType.Lib,
                tag: 'c',
                sourceRoot: 'packages/parser/src',
            },
            {
                name: 'parser',
                root: 'bin/parser',
                type: CProjectType.App,
                tag: 'c',
                sourceRoot: 'bin/parser/src',
            },
        ];
        expectedDependencies = [
            {
                source: 'testparser',
                target: 'libparser',
                sourceFile: 'packages/parser/test/include/testparser.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testparser',
                target: 'libparser',
                sourceFile: 'packages/parser/test/src/testparser.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'parser',
                target: 'libparser',
                sourceFile: 'bin/parser/include/parser.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'parser',
                target: 'libparser',
                sourceFile: 'bin/parser/src/parser.c',
                dependencyType: DependencyType.static,
            },
        ];
        filesToProcess = {};
        filterDependenciesOfProjectMock = jest.spyOn(
            filterDependenciesOfProjectModule,
            'filterDependenciesOfProject'
        );
        filterDependenciesOfProjectMock.mockReturnValueOnce([
            {
                source: 'testparser',
                target: 'libparser',
                sourceFile: 'packages/parser/test/include/testparser.h',
                dependencyType: 'static',
            },
            {
                source: 'testparser',
                target: 'libparser',
                sourceFile: 'packages/parser/test/src/testparser.c',
                dependencyType: 'static',
            },
        ]);
        filterDependenciesOfProjectMock.mockReturnValueOnce([]);
        filterDependenciesOfProjectMock.mockReturnValueOnce([
            {
                source: 'parser',
                target: 'libparser',
                sourceFile: 'bin/parser/include/parser.h',
                dependencyType: 'static',
            },
            {
                source: 'parser',
                target: 'libparser',
                sourceFile: 'bin/parser/src/parser.c',
                dependencyType: 'static',
            },
        ]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should not get dependencies if no files to process', () => {
        const result = getDependencies(
            workspaceLayout,
            projects,
            filesToProcess
        );
        expect(filterDependenciesOfProjectMock).toBeCalledTimes(0);
        expect(result).toStrictEqual([]);
    });

    it.todo('implement this here');
    // it('should get dependencies', () => {
    //     const result = getDependencies(
    //         workspaceLayout,
    //         projects,
    //         filesToProcess
    //     );
    //     expect(filterDependenciesOfProjectMock).toBeCalledTimes(
    //         projects.length
    //     );
    //     expect(result).toStrictEqual(expectedDependencies);
    // });
});
