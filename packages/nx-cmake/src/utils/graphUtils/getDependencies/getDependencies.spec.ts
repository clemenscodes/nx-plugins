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
    let fileMap: ProjectFileMap;
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
        fileMap = {
            parser: [
                {
                    file: 'bin/parser/CMakeLists.txt',
                    hash: '17299240877484337829',
                },
                { file: 'bin/parser/README.md', hash: '7643242783975375151' },
                {
                    file: 'bin/parser/include/parser.h',
                    hash: '11018423326186667389',
                },
                {
                    file: 'bin/parser/project.json',
                    hash: '2184246761215036098',
                },
                {
                    file: 'bin/parser/src/parser.c',
                    hash: '3553739439408751796',
                },
            ],
            libparser: [
                {
                    file: 'packages/parser/CMakeLists.txt',
                    hash: '4187171820888433546',
                },
                {
                    file: 'packages/parser/README.md',
                    hash: '519973881722473310',
                },
                {
                    file: 'packages/parser/include/libparser.h',
                    hash: '9050508492991185026',
                },
                {
                    file: 'packages/parser/project.json',
                    hash: '3459988573673696231',
                },
                {
                    file: 'packages/parser/src/libparser.c',
                    hash: '5782631378711784791',
                },
            ],
            testparser: [
                {
                    file: 'packages/parser/test/CMakeLists.txt',
                    hash: '9995994963779964934',
                },
                {
                    file: 'packages/parser/test/README.md',
                    hash: '13416536286541011897',
                },
                {
                    file: 'packages/parser/test/include/testparser.h',
                    hash: '9147925740844481238',
                },
                {
                    file: 'packages/parser/test/project.json',
                    hash: '3367775946370084247',
                },
                {
                    file: 'packages/parser/test/src/testparser.c',
                    hash: '2754802812570811200',
                },
            ],
        };
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
            fileMap,
            filesToProcess
        );
        expect(filterDependenciesOfProjectMock).toBeCalledTimes(0);
        expect(result).toStrictEqual([]);
    });

    it.todo(
        'should get dependencies'
        // () => {
        //     const result = getDependencies(
        //         workspaceLayout,
        //         projects,
        //         fileMap,
        //         filesToProcess
        //     );
        //     expect(filterDependenciesOfProjectMock).toBeCalledTimes(
        //         projects.length
        //     );
        //     expect(result).toStrictEqual(expectedDependencies);
        // }
    );
});
