import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import type { Graph } from '../../../../models/types';
import { DependencyType } from '@nx/devkit';
import { reduceDependencies } from './reduceDependencies';

describe('reduceDependencies', () => {
    let graph: Graph;
    let dependencies: ProjectGraphDependencyWithFile[];
    let expectedReducedDependencies: ProjectGraphDependencyWithFile[];

    beforeEach(() => {
        graph = {
            testcc: new Set<string>().add('libcc'),
            libcc: new Set<string>(),
            testbb: new Set<string>().add('libbb'),
            libbb: new Set<string>().add('libcc'),
            cc: new Set<string>().add('libcc'),
            bb: new Set<string>().add('libbb'),
        };
        dependencies = [
            {
                source: 'testbb',
                target: 'libbb',
                sourceFile: 'packages/bb/include/libbb.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testbb',
                target: 'libbb',
                sourceFile: 'packages/bb/src/libbb.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testbb',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testbb',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcc',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcc',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libbb',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libbb',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'cc',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'cc',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libbb',
                sourceFile: 'packages/bb/include/libbb.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libbb',
                sourceFile: 'packages/bb/src/libbb.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                dependencyType: DependencyType.static,
            },
        ];
        expectedReducedDependencies = [
            {
                source: 'testbb',
                target: 'libbb',
                sourceFile: 'packages/bb/include/libbb.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testbb',
                target: 'libbb',
                sourceFile: 'packages/bb/src/libbb.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcc',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcc',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libbb',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libbb',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'cc',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'cc',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                dependencyType: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libbb',
                sourceFile: 'packages/bb/include/libbb.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libbb',
                sourceFile: 'packages/bb/src/libbb.cpp',
                dependencyType: DependencyType.static,
            },
        ];
    });

    it('should reduce depdencies', () => {
        const reducedDependencies = reduceDependencies(graph, dependencies);
        expect(reducedDependencies).toStrictEqual(expectedReducedDependencies);
    });
});
