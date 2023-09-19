import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import { DependencyType } from '@nx/devkit';
import { reduceDependenciesTransitively } from './reduceDependenciesTransitively';

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
});
