import type { RawProjectGraphDependency } from '@nx/devkit';
import type { Graph } from '@/types';
import { DependencyType } from '@nx/devkit';
import { reduceDependencies } from './reduceDependencies';

describe('reduceDependencies', () => {
    let graph: Graph;
    let dependencies: RawProjectGraphDependency[];
    let expectedReducedDependencies: RawProjectGraphDependency[];

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
                type: DependencyType.static,
            },
            {
                source: 'testbb',
                target: 'libbb',
                sourceFile: 'packages/bb/src/libbb.cpp',
                type: DependencyType.static,
            },
            {
                source: 'testbb',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                type: DependencyType.static,
            },
            {
                source: 'testbb',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                type: DependencyType.static,
            },
            {
                source: 'testcc',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                type: DependencyType.static,
            },
            {
                source: 'testcc',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                type: DependencyType.static,
            },
            {
                source: 'libbb',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                type: DependencyType.static,
            },
            {
                source: 'libbb',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                type: DependencyType.static,
            },
            {
                source: 'cc',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                type: DependencyType.static,
            },
            {
                source: 'cc',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                type: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libbb',
                sourceFile: 'packages/bb/include/libbb.h',
                type: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libbb',
                sourceFile: 'packages/bb/src/libbb.cpp',
                type: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                type: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                type: DependencyType.static,
            },
        ];
        expectedReducedDependencies = [
            {
                source: 'testbb',
                target: 'libbb',
                sourceFile: 'packages/bb/include/libbb.h',
                type: DependencyType.static,
            },
            {
                source: 'testbb',
                target: 'libbb',
                sourceFile: 'packages/bb/src/libbb.cpp',
                type: DependencyType.static,
            },
            {
                source: 'testcc',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                type: DependencyType.static,
            },
            {
                source: 'testcc',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                type: DependencyType.static,
            },
            {
                source: 'libbb',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                type: DependencyType.static,
            },
            {
                source: 'libbb',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                type: DependencyType.static,
            },
            {
                source: 'cc',
                target: 'libcc',
                sourceFile: 'packages/cc/include/libcc.h',
                type: DependencyType.static,
            },
            {
                source: 'cc',
                target: 'libcc',
                sourceFile: 'packages/cc/src/libcc.cpp',
                type: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libbb',
                sourceFile: 'packages/bb/include/libbb.h',
                type: DependencyType.static,
            },
            {
                source: 'bb',
                target: 'libbb',
                sourceFile: 'packages/bb/src/libbb.cpp',
                type: DependencyType.static,
            },
        ];
    });

    it('should reduce depdencies', () => {
        const reducedDependencies = reduceDependencies(graph, dependencies);
        expect(reducedDependencies).toStrictEqual(expectedReducedDependencies);
    });
});
