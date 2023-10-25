import type { RawProjectGraphDependency } from '@nx/devkit';
import { DependencyType } from '@nx/devkit';
import { reduceDependenciesTransitively } from './reduceDependenciesTransitively';

describe('reduceDependenciesTransitively', () => {
    let dependencies: RawProjectGraphDependency[];
    let expectedReducedDependencies: RawProjectGraphDependency[];

    beforeEach(() => {
        dependencies = [
            {
                source: 'testtrash',
                target: 'libtrash',
                sourceFile: 'packages/trash/test/include/testtrash.h',
                type: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/test/include/testtrash.h',
                type: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libshit',
                sourceFile: 'packages/trash/test/include/testtrash.h',
                type: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libtrash',
                sourceFile: 'packages/trash/test/src/testtrash.c',
                type: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/test/src/testtrash.c',
                type: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libshit',
                sourceFile: 'packages/trash/test/src/testtrash.c',
                type: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libcrap',
                sourceFile: 'packages/crap/test/include/testcrap.h',
                type: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/test/include/testcrap.h',
                type: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libcrap',
                sourceFile: 'packages/crap/test/src/testcrap.c',
                type: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/test/src/testcrap.c',
                type: DependencyType.static,
            },
            {
                source: 'testshit',
                target: 'libshit',
                sourceFile: 'packages/shit/test/include/testshit.h',
                type: DependencyType.static,
            },
            {
                source: 'testshit',
                target: 'libshit',
                sourceFile: 'packages/shit/test/src/testshit.c',
                type: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/include/libtrash.h',
                type: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libshit',
                sourceFile: 'packages/trash/include/libtrash.h',
                type: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/src/libtrash.c',
                type: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libshit',
                sourceFile: 'packages/trash/src/libtrash.c',
                type: DependencyType.static,
            },
            {
                source: 'libcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/include/libcrap.h',
                type: DependencyType.static,
            },
            {
                source: 'libcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/src/libcrap.c',
                type: DependencyType.static,
            },
            {
                source: 'shit',
                target: 'libshit',
                sourceFile: 'bin/shit/include/shit.h',
                type: DependencyType.static,
            },
            {
                source: 'shit',
                target: 'libshit',
                sourceFile: 'bin/shit/src/shit.c',
                type: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libcrap',
                sourceFile: 'bin/crap/include/crap.h',
                type: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libshit',
                sourceFile: 'bin/crap/include/crap.h',
                type: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libcrap',
                sourceFile: 'bin/crap/src/crap.c',
                type: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libshit',
                sourceFile: 'bin/crap/src/crap.c',
                type: DependencyType.static,
            },
        ];
        expectedReducedDependencies = [
            {
                source: 'testtrash',
                target: 'libtrash',
                sourceFile: 'packages/trash/test/include/testtrash.h',
                type: DependencyType.static,
            },
            {
                source: 'testtrash',
                target: 'libtrash',
                sourceFile: 'packages/trash/test/src/testtrash.c',
                type: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libcrap',
                sourceFile: 'packages/crap/test/include/testcrap.h',
                type: DependencyType.static,
            },
            {
                source: 'testcrap',
                target: 'libcrap',
                sourceFile: 'packages/crap/test/src/testcrap.c',
                type: DependencyType.static,
            },
            {
                source: 'testshit',
                target: 'libshit',
                sourceFile: 'packages/shit/test/include/testshit.h',
                type: DependencyType.static,
            },
            {
                source: 'testshit',
                target: 'libshit',
                sourceFile: 'packages/shit/test/src/testshit.c',
                type: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/include/libtrash.h',
                type: DependencyType.static,
            },
            {
                source: 'libtrash',
                target: 'libcrap',
                sourceFile: 'packages/trash/src/libtrash.c',
                type: DependencyType.static,
            },
            {
                source: 'libcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/include/libcrap.h',
                type: DependencyType.static,
            },
            {
                source: 'libcrap',
                target: 'libshit',
                sourceFile: 'packages/crap/src/libcrap.c',
                type: DependencyType.static,
            },
            {
                source: 'shit',
                target: 'libshit',
                sourceFile: 'bin/shit/include/shit.h',
                type: DependencyType.static,
            },
            {
                source: 'shit',
                target: 'libshit',
                sourceFile: 'bin/shit/src/shit.c',
                type: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libcrap',
                sourceFile: 'bin/crap/include/crap.h',
                type: DependencyType.static,
            },
            {
                source: 'crap',
                target: 'libcrap',
                sourceFile: 'bin/crap/src/crap.c',
                type: DependencyType.static,
            },
        ];
    });

    it('should reduce dependencies transitively', () => {
        const deps = reduceDependenciesTransitively(dependencies);
        expect(deps).toStrictEqual(expectedReducedDependencies);
    });
});
