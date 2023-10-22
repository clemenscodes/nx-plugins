import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { generateLibFiles } from './generateLibFiles';
import * as devkit from '@nx/devkit';
import { readFileWithTree } from '@/util';
import { LibSchema, getDefaultInitGeneratorOptions } from '../../config';
import initGenerator from '../../generators/init/initGenerator';

describe('generateLibFiles', () => {
    let tree: Tree;
    let options: LibSchema;
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

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        tree = createTreeWithEmptyWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        options = resolveLibOptions({
            name: 'test',
            language: 'C++',
            generateTests: false,
        });
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
            '#include "libtest.h"\n' +
            '\n' +
            'int test(void) {\n' +
            '    return 0;\n' +
            '}\n';
        expectedListsFile =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE CXX)\n` +
            '\n' +
            `set_project_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(${options.libName} LANGUAGES \${LANGUAGE} VERSION \${${options.libName}_VERSION})\n` +
            '\n' +
            `set_library_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(${options.libName})\n` +
            '\n' +
            `set_package_version(${options.libName} \${${options.libName}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            `    cmake/${options.libName}Config.cmake.in\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}Config.cmake\n` +
            `    INSTALL_DESTINATION \${${options.libName}_INSTALL_CMAKEDIR}\n` +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT ${options.libName}_Targets\n` +
            `    NAMESPACE ${options.libName}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE ${options.libName})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}ConfigVersion.cmake\n` +
            `    DESTINATION \${${options.libName}_INSTALL_CMAKEDIR}\n` +
            ')\n';
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
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE C)\n` +
            '\n' +
            `set_project_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(${options.libName} LANGUAGES \${LANGUAGE} VERSION \${${options.libName}_VERSION})\n` +
            '\n' +
            `set_library_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(${options.libName})\n` +
            '\n' +
            `set_package_version(${options.libName} \${${options.libName}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            `    cmake/${options.libName}Config.cmake.in\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}Config.cmake\n` +
            `    INSTALL_DESTINATION \${${options.libName}_INSTALL_CMAKEDIR}\n` +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT ${options.libName}_Targets\n` +
            `    NAMESPACE ${options.libName}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE ${options.libName})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}ConfigVersion.cmake\n` +
            `    DESTINATION \${${options.libName}_INSTALL_CMAKEDIR}\n` +
            ')\n';
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
