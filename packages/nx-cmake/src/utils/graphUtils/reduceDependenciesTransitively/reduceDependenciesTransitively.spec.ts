import { DependencyType, ProjectGraphDependencyWithFile } from '@nx/devkit';
import type { Graph } from '../../../models/types';
import {
    reduceDependencies,
    reduceDependenciesTransitively,
    reduceGraph,
} from './reduceDependenciesTransitively';

describe('reduceDependenciesTransitively', () => {
    let dependencies: ProjectGraphDependencyWithFile[];
    let expectedReducedDependencies: ProjectGraphDependencyWithFile[];

    beforeEach(() => {
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

    it('should reduce dependencies transitively', () => {
        const deps = reduceDependenciesTransitively(dependencies);
        expect(deps).toStrictEqual(expectedReducedDependencies);
    });

    describe('reduceGraph', () => {
        let graph: Graph;
        let expectedReducedGraph: Graph;

        beforeEach(() => {
            graph = {
                testcc: new Set<string>().add('libcc'),
                libcc: new Set<string>(),
                testbb: new Set<string>().add('libbb').add('libcc'),
                libbb: new Set<string>().add('libcc'),
                cc: new Set<string>().add('libcc'),
                bb: new Set<string>().add('libbb').add('libcc'),
            };
            expectedReducedGraph = {
                testcc: new Set<string>().add('libcc'),
                libcc: new Set<string>(),
                testbb: new Set<string>().add('libbb'),
                libbb: new Set<string>().add('libcc'),
                cc: new Set<string>().add('libcc'),
                bb: new Set<string>().add('libbb'),
            };
        });

        it('should reduce graph', () => {
            const reducedGraph = reduceGraph(graph);
            expect(reducedGraph).toStrictEqual(expectedReducedGraph);
        });
    });

    describe('reduceDependencies', () => {
        let graph: Graph;

        beforeEach(() => {
            graph = {
                testcc: new Set<string>().add('libcc'),
                libcc: new Set<string>(),
                testbb: new Set<string>().add('libbb'),
                libbb: new Set<string>().add('libcc'),
                cc: new Set<string>().add('libcc'),
                bb: new Set<string>().add('libbb'),
            };
        });

        it('should reduce depdencies', () => {
            const reducedDependencies = reduceDependencies(graph, dependencies);
            expect(reducedDependencies).toStrictEqual(
                expectedReducedDependencies
            );
        });
    });
});
