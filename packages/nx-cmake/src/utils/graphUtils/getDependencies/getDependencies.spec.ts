import {
    CProjectType,
    type FilteredProject,
    type WorkspaceLayout,
} from '../../../models/types';
import { DependencyType, ProjectGraphDependencyWithFile } from '@nx/devkit';
import { getDependencies } from './getDependencies';
import * as filterDependenciesOfProjectModule from '../filterDependenciesOfProject/filterDependenciesOfProject';

describe('getDependencies', () => {
    const projects: FilteredProject[] = [
        {
            name: 'testnx-cmake-test',
            root: 'packages/nx-cmake-test/test',
            sourceRoot: 'packages/nx-cmake-test/test/src',
            type: CProjectType.App,
            tag: 'c',
        },
        {
            name: 'libnx-cmake-test',
            root: 'packages/nx-cmake-test',
            sourceRoot: 'packages/nx-cmake-test/src',
            type: CProjectType.Lib,
            tag: 'c',
        },
        {
            name: 'nx-cmake-test',
            root: 'nx-cmake-test',
            sourceRoot: 'nx-cmake-test/src',
            type: CProjectType.App,
            tag: 'c',
        },
    ];

    const workspaceLayout: WorkspaceLayout = {
        appsDir: 'bin',
        libsDir: 'packages',
        projectNameAndRootFormat: 'as-provided',
    };

    it('should get dependencies', () => {
        const dummyDependency = {
            source: 'testnx-cmake-test',
            target: 'libnx-cmake-test',
            sourceFile: 'packages/nx-cmake-test/include/libnx-cmake-test.h',
            dependencyType: DependencyType.static,
        };

        jest.spyOn(
            filterDependenciesOfProjectModule,
            'filterDependenciesOfProject'
        ).mockReturnValue([dummyDependency]);

        const result = getDependencies(workspaceLayout, projects);
        const expected: ProjectGraphDependencyWithFile[] = [
            dummyDependency,
            dummyDependency,
            dummyDependency,
        ];
        expect(result).toStrictEqual(expected);
    });
});
