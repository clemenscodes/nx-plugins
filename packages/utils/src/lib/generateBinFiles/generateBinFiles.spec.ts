import type { Tree } from '@nx/devkit';
import { getDefaultInitGeneratorOptions, type BinSchema } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateBinFiles } from './generateBinFiles';
import { resolveBinOptions } from '../resolveBinOptions/resolveBinOptions';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import { initGenerator } from '../initGenerator/initGenerator';
import * as devkit from '@nx/devkit';

describe('generateBinFiles', () => {
    let tree: Tree;
    let options: BinSchema;
    let expectedSourceFile: string;
    let expectedIncludeFile: string;
    let expectedListsFile: string;
    let expectedReadMeFile: string;

    const defaultTest = () => {
        const resolvedOptions = resolveBinOptions(options);
        const { name, projectRoot, languageExtension } = resolvedOptions;
        const binarySourceFile = `${projectRoot}/src/${name}.${languageExtension}`;
        const binaryListsFile = `${projectRoot}/CMakeLists.txt`;
        const binaryIncludeFile = `${projectRoot}/include/${name}.h`;
        const binaryReadMeFile = `${projectRoot}/README.md`;
        generateBinFiles(tree, resolvedOptions);
        const binaryRoot = tree.children(projectRoot);
        const expectedRootFiles = [
            'CMakeLists.txt',
            'README.md',
            'include',
            'src',
        ];
        expect(binaryRoot).toStrictEqual(
            expect.arrayContaining(expectedRootFiles),
        );
        expect(tree.exists(binarySourceFile)).toBe(true);
        expect(tree.exists(binaryListsFile)).toBe(true);
        expect(tree.exists(binaryIncludeFile)).toBe(true);
        expect(tree.exists(binaryReadMeFile)).toBe(true);
        const readIncludeFile = readFileWithTree(tree, binaryIncludeFile);
        const readSourceFile = readFileWithTree(tree, binarySourceFile);
        const readListsFile = readFileWithTree(tree, binaryListsFile);
        const readReadMeFile = readFileWithTree(tree, binaryReadMeFile);
        expect(readIncludeFile).toStrictEqual(expectedIncludeFile);
        expect(readSourceFile).toStrictEqual(expectedSourceFile);
        expect(readListsFile).toStrictEqual(expectedListsFile);
        expect(readReadMeFile).toStrictEqual(expectedReadMeFile);
    };

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        tree = createTreeWithEmptyWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        options = resolveBinOptions({
            name: 'test',
            language: 'C++',
            generateTests: false,
        });
        expectedSourceFile =
            '#include "test.h"\n' +
            '\n' +
            'int main(int argc, char *argv[]) {\n' +
            '    (void)argc;\n' +
            '    (void)argv;\n' +
            '    return test();\n' +
            '}\n';
        expectedListsFile =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            `include(cmake/version.cmake)\n` +
            '\n' +
            `cmake_minimum_required(VERSION 3.21)\n` +
            '\n' +
            'set(PROJECT_TYPE BIN)\n' +
            `set(LANGUAGE CXX)\n` +
            '\n' +
            'set_project_settings(test ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            '\n' +
            `project(${options.name} LANGUAGES \${LANGUAGE} VERSION \${${options.name}_VERSION})\n` +
            '\n' +
            `set_binary_settings(${options.name} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `link_library(${options.name} ${options.name})\n` +
            '\n' +
            `install(TARGETS ${options.name})\n`;
        expectedIncludeFile =
            '#ifndef _TEST_TEST\n' + '#define _TEST_TEST\n' + '\n' + '#endif\n';
        expectedReadMeFile =
            '# test\n' +
            '\n' +
            'This C++ binary was generated using [nx-cmake](https://www.npmjs.com/package/nx-cmake).\n' +
            '\n' +
            '## Executing the binary\n' +
            '\n' +
            '```shell\n' +
            'nx execute test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Configuring the binary using [CMake](https://cmake.org/cmake/help/latest/index.html)\n' +
            '\n' +
            '```shell\n' +
            'nx cmake test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Building the binary using [Make](https://www.gnu.org/software/make/manual/make.html) and [GCC](https://gcc.gnu.org/onlinedocs/)\n' +
            '\n' +
            '```shell\n' +
            'nx build test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Linting the binary using [clang-tidy](https://clang.llvm.org/extra/clang-tidy/)\n' +
            '\n' +
            '```shell\n' +
            'nx lint test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Formatting the binary using [clang-format](https://clang.llvm.org/docs/ClangFormat.html)\n' +
            '\n' +
            '```shell\n' +
            'nx fmt test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Debugging the binary using [GDB](https://sourceware.org/gdb/documentation/)\n' +
            '\n' +
            '```shell\n' +
            'nx debug test --output-style=stream\n' +
            '```\n';
    });

    it('should generate a C++ binary', defaultTest);

    it('should generate a C library', () => {
        options.language = 'C';
        expectedListsFile =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            `include(cmake/version.cmake)\n` +
            '\n' +
            `cmake_minimum_required(VERSION 3.21)\n` +
            '\n' +
            'set(PROJECT_TYPE BIN)\n' +
            `set(LANGUAGE C)\n` +
            '\n' +
            'set_project_settings(test ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            '\n' +
            `project(${options.name} LANGUAGES \${LANGUAGE} VERSION \${${options.name}_VERSION})\n` +
            '\n' +
            `set_binary_settings(${options.name} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `link_library(${options.name} ${options.name})\n` +
            '\n' +
            `install(TARGETS ${options.name})\n`;
        expectedReadMeFile =
            '# test\n' +
            '\n' +
            'This C binary was generated using [nx-cmake](https://www.npmjs.com/package/nx-cmake).\n' +
            '\n' +
            '## Executing the binary\n' +
            '\n' +
            '```shell\n' +
            'nx execute test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Configuring the binary using [CMake](https://cmake.org/cmake/help/latest/index.html)\n' +
            '\n' +
            '```shell\n' +
            'nx cmake test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Building the binary using [Make](https://www.gnu.org/software/make/manual/make.html) and [GCC](https://gcc.gnu.org/onlinedocs/)\n' +
            '\n' +
            '```shell\n' +
            'nx build test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Linting the binary using [clang-tidy](https://clang.llvm.org/extra/clang-tidy/)\n' +
            '\n' +
            '```shell\n' +
            'nx lint test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Formatting the binary using [clang-format](https://clang.llvm.org/docs/ClangFormat.html)\n' +
            '\n' +
            '```shell\n' +
            'nx fmt test --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Debugging the binary using [GDB](https://sourceware.org/gdb/documentation/)\n' +
            '\n' +
            '```shell\n' +
            'nx debug test --output-style=stream\n' +
            '```\n';
        defaultTest();
    });
});
