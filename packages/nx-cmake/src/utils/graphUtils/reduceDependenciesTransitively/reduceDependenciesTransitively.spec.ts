import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import { DependencyType } from '@nx/devkit';
import { reduceDependenciesTransitively } from './reduceDependenciesTransitively';

describe('reduceDependenciesTransitively', () => {
    let dependencies: ProjectGraphDependencyWithFile[];
    let expectedReducedDependencies: ProjectGraphDependencyWithFile[];

    beforeEach(() => {
        dependencies = [
            {
                source: 'testtrash',
                target: 'libtrash',
                sourceFile: 'packages/trash/test/include/testtrash.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/test/include/testtrash.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libshit',
                sourceFile: 'packages/trash/test/include/testtrash.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libtrash',
                sourceFile: 'packages/trash/test/src/testtrash.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/test/src/testtrash.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libshit',
                sourceFile: 'packages/trash/test/src/testtrash.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libcrap',
                sourceFile: 'packages/crap/test/include/testcrap.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/test/include/testcrap.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libcrap',
                sourceFile: 'packages/crap/test/src/testcrap.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/test/src/testcrap.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testshit',
                target: 'libshit',
                sourceFile: 'packages/shit/test/include/testshit.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testshit',
                target: 'libshit',
                sourceFile: 'packages/shit/test/src/testshit.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/include/libtrash.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libshit',
                sourceFile: 'packages/trash/include/libtrash.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/src/libtrash.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libshit',
                sourceFile: 'packages/trash/src/libtrash.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/include/libcrap.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/src/libcrap.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'shit',
                target: 'libshit',
                sourceFile: 'bin/shit/include/shit.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'shit',
                target: 'libshit',
                sourceFile: 'bin/shit/src/shit.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libcrap',
                sourceFile: 'bin/crap/include/crap.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libshit',
                sourceFile: 'bin/crap/include/crap.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libcrap',
                sourceFile: 'bin/crap/src/crap.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libshit',
                sourceFile: 'bin/crap/src/crap.c',
                dependencyType: DependencyType.static,
            },
        ];
        expectedReducedDependencies = [
            {
                source: 'testtrash',
                target: 'libtrash',
                sourceFile: 'packages/trash/test/include/testtrash.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libtrash',
                sourceFile: 'packages/trash/test/src/testtrash.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libcrap',
                sourceFile: 'packages/crap/test/include/testcrap.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libcrap',
                sourceFile: 'packages/crap/test/src/testcrap.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testshit',
                target: 'libshit',
                sourceFile: 'packages/shit/test/include/testshit.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'testshit',
                target: 'libshit',
                sourceFile: 'packages/shit/test/src/testshit.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/include/libtrash.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/src/libtrash.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/include/libcrap.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'libcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/src/libcrap.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'shit',
                target: 'libshit',
                sourceFile: 'bin/shit/include/shit.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'shit',
                target: 'libshit',
                sourceFile: 'bin/shit/src/shit.c',
                dependencyType: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libcrap',
                sourceFile: 'bin/crap/include/crap.h',
                dependencyType: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libcrap',
                sourceFile: 'bin/crap/src/crap.c',
                dependencyType: DependencyType.static,
            },
        ];
    });

    it.todo('fix this')
    // it('should reduce dependencies transitively', () => {
    //     const deps = reduceDependenciesTransitively(dependencies);
    //     expect(deps).toStrictEqual(expectedReducedDependencies);
    // });
});
