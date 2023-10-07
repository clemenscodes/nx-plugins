import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { generateLibFiles } from './generateLibFiles';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';

describe('generateLibFiles', () => {
    let tree: Tree;
    let options: LibGeneratorSchema;
    let libraryRoot: string;
    let libraryListsFile: string;
    let librarySourceFile: string;
    let libraryIncludeFile: string;
    let libraryReadMeFile: string;
    let expectedLibraryRootFiles: string[];
    let expectedIncludeFile: string;
    let expectedSourceFile: string;
    let expectedListsFile: string;
    let expectedReadMeFile: string;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            language: 'C++',
            generateTests: false,
        };
        libraryRoot = `packages/test`;
        libraryListsFile = `packages/test/CMakeLists.txt`;
        librarySourceFile = `packages/test/src/libtest.cpp`;
        libraryIncludeFile = `packages/test/include/libtest.h`;
        libraryReadMeFile = `packages/test/README.md`;
        expectedLibraryRootFiles = [
            'CMakeLists.txt',
            'README.md',
            'include',
            'src',
        ];
        expectedIncludeFile =
            '#ifndef _LIBTEST_TEST\n' +
            '#define _LIBTEST_TEST\n' +
            '\n' +
            'int test(void);\n' +
            '\n' +
            '#endif\n';
        expectedSourceFile =
            '#include <test/include/libtest.h>\n' +
            '\n' +
            'int test(void) {\n' +
            '    return 0;\n' +
            '}\n';
        expectedListsFile =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'set_project_settings(libtest ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(libtest CXX)\n' +
            'set_library_settings(libtest ${CMAKE_CURRENT_SOURCE_DIR})\n';
        expectedReadMeFile =
            '# libtest\n' +
            '\n' +
            'This C++ library was generated using [nx-cmake](https://www.npmjs.com/package/nx-cmake).\n' +
            '\n' +
            '## Configuring the library using [CMake](https://cmake.org/cmake/help/latest/index.html)\n' +
            '\n' +
            '```shell\n' +
            'nx cmake libtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Building the library using [Make](https://www.gnu.org/software/make/manual/make.html) and [GCC](https://gcc.gnu.org/onlinedocs/)\n' +
            '\n' +
            '```shell\n' +
            'nx build libtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Linting the library using [clang-tidy](https://clang.llvm.org/extra/clang-tidy/)\n' +
            '\n' +
            '```shell\n' +
            'nx lint libtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Formatting the library using [clang-format](https://clang.llvm.org/docs/ClangFormat.html)\n' +
            '\n' +
            '```shell\n' +
            'nx fmt libtest --output-style=stream\n' +
            '```\n';
    });

    const defaultTest = () => {
        const resolvedOptions = resolveLibOptions(options);
        generateLibFiles(tree, resolvedOptions);
        const libraryRootFiles = tree.children(libraryRoot);
        expect(libraryRootFiles).toEqual(
            expect.arrayContaining(expectedLibraryRootFiles),
        );
        expect(tree.exists(librarySourceFile)).toBe(true);
        expect(tree.exists(libraryIncludeFile)).toBe(true);
        const includeFileContent = readFileWithTree(tree, libraryIncludeFile);
        const sourceFileContent = readFileWithTree(tree, librarySourceFile);
        const listsFileContent = readFileWithTree(tree, libraryListsFile);
        const readMeFileContent = readFileWithTree(tree, libraryReadMeFile);
        expect(includeFileContent).toStrictEqual(expectedIncludeFile);
        expect(sourceFileContent).toStrictEqual(expectedSourceFile);
        expect(listsFileContent).toStrictEqual(expectedListsFile);
        expect(readMeFileContent).toStrictEqual(expectedReadMeFile);
    };

    it('should generate a C++ library', defaultTest);

    it('should generate a C library', () => {
        options.language = 'C';
        librarySourceFile = `packages/test/src/libtest.c`;
        expectedListsFile =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'set_project_settings(libtest ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(libtest C)\n' +
            'set_library_settings(libtest ${CMAKE_CURRENT_SOURCE_DIR})\n';
        expectedReadMeFile =
            '# libtest\n' +
            '\n' +
            'This C library was generated using [nx-cmake](https://www.npmjs.com/package/nx-cmake).\n' +
            '\n' +
            '## Configuring the library using [CMake](https://cmake.org/cmake/help/latest/index.html)\n' +
            '\n' +
            '```shell\n' +
            'nx cmake libtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Building the library using [Make](https://www.gnu.org/software/make/manual/make.html) and [GCC](https://gcc.gnu.org/onlinedocs/)\n' +
            '\n' +
            '```shell\n' +
            'nx build libtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Linting the library using [clang-tidy](https://clang.llvm.org/extra/clang-tidy/)\n' +
            '\n' +
            '```shell\n' +
            'nx lint libtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Formatting the library using [clang-format](https://clang.llvm.org/docs/ClangFormat.html)\n' +
            '\n' +
            '```shell\n' +
            'nx fmt libtest --output-style=stream\n' +
            '```\n';
        defaultTest();
    });
});
