import type { Tree } from '@nx/devkit';
import { setupWorkspace } from '@/mocks';
import { readFileWithTree } from '@/file';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { generateLibFiles } from './generateLibFiles';
import { LibSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from '../../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import initGenerator from '../../init/initGenerator';

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
        tree = setupWorkspace();
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
            `set(PROJECT_NAME ${options.libName})\n` +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE CXX)\n` +
            '\n' +
            `set_project_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(\${PROJECT_NAME} LANGUAGES \${LANGUAGE} VERSION \${\${PROJECT_NAME}_VERSION})\n` +
            '\n' +
            `set_library_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(\${PROJECT_NAME})\n` +
            '\n' +
            `set_package_version(\${PROJECT_NAME} \${\${PROJECT_NAME}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            `    cmake/\${PROJECT_NAME}Config.cmake.in\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}Config.cmake\n` +
            `    INSTALL_DESTINATION \${\${PROJECT_NAME}_INSTALL_CMAKEDIR}\n` +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT \${PROJECT_NAME}_Targets\n` +
            `    NAMESPACE \${PROJECT_NAME}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE \${PROJECT_NAME})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}ConfigVersion.cmake\n` +
            `    DESTINATION \${\${PROJECT_NAME}_INSTALL_CMAKEDIR}\n` +
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
            `set(PROJECT_NAME ${options.libName})\n` +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE C)\n` +
            '\n' +
            `set_project_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(\${PROJECT_NAME} LANGUAGES \${LANGUAGE} VERSION \${\${PROJECT_NAME}_VERSION})\n` +
            '\n' +
            `set_library_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(\${PROJECT_NAME})\n` +
            '\n' +
            `set_package_version(\${PROJECT_NAME} \${\${PROJECT_NAME}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            `    cmake/\${PROJECT_NAME}Config.cmake.in\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}Config.cmake\n` +
            `    INSTALL_DESTINATION \${\${PROJECT_NAME}_INSTALL_CMAKEDIR}\n` +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT \${PROJECT_NAME}_Targets\n` +
            `    NAMESPACE \${PROJECT_NAME}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE \${PROJECT_NAME})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}ConfigVersion.cmake\n` +
            `    DESTINATION \${\${PROJECT_NAME}_INSTALL_CMAKEDIR}\n` +
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
