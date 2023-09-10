import type { FilteredProject, WorkspaceLayout } from './../../../models/types';
import {
    DependencyType,
    type CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import { getDependencies } from './getDependencies';
import * as filterDependenciesOfProjectModule from '../filterDependenciesOfProject/filterDependenciesOfProject';

describe('getDependencies', () => {
    const ctx: CreateDependenciesContext = {
        fileMap: {
            'libnx-cmake-test': [
                {
                    file: 'packages/nx-cmake-test/CMakeLists.txt',
                    hash: '829231685150609454',
                },
                {
                    file: 'packages/nx-cmake-test/include/libnx-cmake-test.h',
                    hash: '7036340064984088729',
                },
                {
                    file: 'packages/nx-cmake-test/project.json',
                    hash: '13915495002580077292',
                },
                {
                    file: 'packages/nx-cmake-test/src/libnx-cmake-test.c',
                    hash: '4318600325787701056',
                },
            ],
            'nx-cmake-test': [
                {
                    file: 'nx-cmake-test/CMakeLists.txt',
                    hash: '15688613539306781857',
                },
                {
                    file: 'nx-cmake-test/include/nx-cmake-test.h',
                    hash: '17901624547898539879',
                },
                {
                    file: 'nx-cmake-test/project.json',
                    hash: '15328991193451229361',
                },
                {
                    file: 'nx-cmake-test/src/nx-cmake-test.c',
                    hash: '2517855479433356054',
                },
            ],
            'testnx-cmake-test': [
                {
                    file: 'packages/nx-cmake-test/test/CMakeLists.txt',
                    hash: '17634980793772018971',
                },
                {
                    file: 'packages/nx-cmake-test/test/include/testnx-cmake-test.h',
                    hash: '15375799923284101908',
                },
                {
                    file: 'packages/nx-cmake-test/test/project.json',
                    hash: '14354968753016061528',
                },
                {
                    file: 'packages/nx-cmake-test/test/src/testnx-cmake-test.c',
                    hash: '17933482601772038474',
                },
            ],
        },
    } as unknown as CreateDependenciesContext;

    const projects: FilteredProject[] = [
        {
            name: 'testnx-cmake-test',
            root: 'packages/nx-cmake-test/test',
            type: 'app',
            tag: 'c',
        },
        {
            name: 'libnx-cmake-test',
            root: 'packages/nx-cmake-test',
            type: 'lib',
            tag: 'c',
        },
        {
            name: 'nx-cmake-test',
            root: 'nx-cmake-test',
            type: 'app',
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

        const result = getDependencies(workspaceLayout, ctx, projects);
        const expected: ProjectGraphDependencyWithFile[] = [
            dummyDependency,
            dummyDependency,
            dummyDependency,
        ];
        expect(result).toStrictEqual(expected);
    });
});
