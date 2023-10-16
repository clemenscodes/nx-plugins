import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema, LibSchema } from '@/config';
import { getDefaultInitGeneratorOptions } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readProjectConfiguration } from '@nx/devkit';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { generateLibTestFiles } from './generateLibTestFiles';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import { initGenerator } from '../initGenerator/initGenerator';
import * as devkit from '@nx/devkit';

describe('generateLibTestFiles', () => {
    let tree: Tree;
    let options: LibGeneratorSchema;
    let resolvedOptions: LibSchema;
    let testRoot: string;
    let testListsFile: string;
    let testSourceFile: string;
    let testIncludeFile: string;
    let testReadMeFile: string;
    let expectedTestRootFiles: string[];
    let expectedIncludeFile: string;
    let expectedSourceFile: string;
    let expectedListsFile: string;
    let expectedReadMeFile: string;

    const defaultTest = () => {
        generateLibTestFiles(tree, resolvedOptions);
        const testRootFiles = tree.children(testRoot);
        expect(testRootFiles).toEqual(
            expect.arrayContaining(expectedTestRootFiles),
        );
        expect(tree.exists(testSourceFile));
        expect(tree.exists(testIncludeFile));
        const includeFileContent = readFileWithTree(tree, testIncludeFile);
        const sourceFileContent = readFileWithTree(tree, testSourceFile);
        const listsFileContent = readFileWithTree(tree, testListsFile);
        const readMeFileContent = readFileWithTree(tree, testReadMeFile);
        expect(includeFileContent).toStrictEqual(expectedIncludeFile);
        expect(sourceFileContent).toStrictEqual(expectedSourceFile);
        expect(listsFileContent).toStrictEqual(expectedListsFile);
        expect(readMeFileContent).toStrictEqual(expectedReadMeFile);
    };

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        tree = createTreeWithEmptyWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        options = {
            name: 'test',
            language: 'C',
            generateTests: true,
        };
        resolvedOptions = resolveLibOptions(options);
        testRoot = `bin/testtest`;
        testListsFile = `${testRoot}/CMakeLists.txt`;
        testSourceFile = `${testRoot}/src/testtest.c`;
        testIncludeFile = `${testRoot}/include/testtest.h`;
        testReadMeFile = `${testRoot}/README.md`;
        expectedTestRootFiles = [
            'CMakeLists.txt',
            'README.md',
            'include',
            'src',
        ];
        expectedIncludeFile =
            '#ifndef _TESTTEST_TEST\n' +
            '#define _TESTTEST_TEST\n' +
            '\n' +
            '#include "libcmocka.h"\n' +
            '#include <test/include/libtest.h>\n' +
            '\n' +
            '#endif\n';

        expectedSourceFile =
            '#include "include/testtest.h"\n' +
            '\n' +
            'static int setup(void **state) {\n' +
            '\t(void) state;\n' +
            '\treturn 0;\n' +
            '}\n' +
            '\n' +
            'static int teardown(void **state) {\n' +
            '\t(void) state;\n' +
            '\treturn 0;\n' +
            '}\n' +
            '\n' +
            'static void test_test(void **state) {\n' +
            '\t(void) state;\n' +
            '\ttest();\n' +
            '}\n' +
            '\n' +
            'int main(void) {\n' +
            '\tconst struct CMUnitTest test_tests[] = {\n' +
            '\t\tcmocka_unit_test(test_test),\n' +
            '\t};\n' +
            '\treturn cmocka_run_group_tests(test_tests, setup, teardown);\n' +
            '}\n' +
            '\n';

        expectedListsFile =
            `include(${resolvedOptions.relativeRootPath}${resolvedOptions.cmakeConfigDir}/${resolvedOptions.workspaceName}.cmake)\n` +
            `cmake_minimum_required(VERSION 3.21)\n` +
            'set_project_settings(testtest ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(testtest C)\n' +
            'set_binary_settings(testtest ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'link_static_library(${CMAKE_PROJECT_NAME} test)\n' +
            'enable_testing()\n' +
            'link_cmocka(${CMAKE_PROJECT_NAME})\n' +
            '\n' +
            'add_test(UnitTests testtest)\n';

        expectedReadMeFile =
            '# testtest\n' +
            '\n' +
            'This C test binary was generated using [nx-cmake](https://www.npmjs.com/package/nx-cmake).\n' +
            '\n' +
            '## Configuring the test binary using [CMake](https://cmake.org/cmake/help/latest/index.html)\n' +
            '\n' +
            '```shell\n' +
            'nx cmake testtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Building the test binary using [Make](https://www.gnu.org/software/make/manual/make.html) and [GCC](https://gcc.gnu.org/onlinedocs/)\n' +
            '\n' +
            '```shell\n' +
            'nx build testtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Linting the test binary using [clang-tidy](https://clang.llvm.org/extra/clang-tidy/)\n' +
            '\n' +
            '```shell\n' +
            'nx lint testtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Formatting the test binary using [clang-format](https://clang.llvm.org/docs/ClangFormat.html)\n' +
            '\n' +
            '```shell\n' +
            'nx fmt testtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Testing the test binary using [ctest](https://cmake.org/cmake/help/latest/manual/ctest.1.html) and  [cmocka](https://cmocka.org/) \n' +
            '\n' +
            '```shell\n' +
            'nx test testtest --output-style=stream\n' +
            '```\n';
    });

    it('should not generate a test library', () => {
        options.generateTests = false;
        generateLibTestFiles(tree, resolvedOptions);
        expect(() =>
            readProjectConfiguration(tree, resolvedOptions.testName),
        ).toThrow("Cannot find configuration for 'testtest'");
    });

    it('should generate a C test library', defaultTest);

    it('should generate a C++ test library', () => {
        options.generateTests = true;
        options.language = 'C++';
        resolvedOptions = resolveLibOptions(options);
        testSourceFile = `bin/testtest/src/testtest.cpp`;
        expectedIncludeFile =
            '#ifndef _TESTTEST_TEST\n' +
            '#define _TESTTEST_TEST\n' +
            '\n' +
            '#include "libgtest.h"\n' +
            '#include <test/include/libtest.h>\n' +
            '\n' +
            '#endif\n';
        expectedSourceFile =
            '#include "include/testtest.h"\n' +
            '\n' +
            'TEST(libtest, test_test) {\n' +
            '\tEXPECT_EQ(test(), 0);\n' +
            '}\n' +
            '\n';
        expectedListsFile =
            `include(${resolvedOptions.relativeRootPath}${resolvedOptions.cmakeConfigDir}/${resolvedOptions.workspaceName}.cmake)\n` +
            `cmake_minimum_required(VERSION 3.21)\n` +
            'set_project_settings(testtest ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(testtest CXX)\n' +
            'set_binary_settings(testtest ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'link_static_library(${CMAKE_PROJECT_NAME} test)\n' +
            'enable_testing()\n' +
            'link_gtest(${CMAKE_PROJECT_NAME})\n' +
            'include(GoogleTest)\n' +
            'gtest_discover_tests(testtest)\n';
        expectedReadMeFile =
            '# testtest\n' +
            '\n' +
            'This C++ test binary was generated using [nx-cmake](https://www.npmjs.com/package/nx-cmake).\n' +
            '\n' +
            '## Configuring the test binary using [CMake](https://cmake.org/cmake/help/latest/index.html)\n' +
            '\n' +
            '```shell\n' +
            'nx cmake testtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Building the test binary using [Make](https://www.gnu.org/software/make/manual/make.html) and [GCC](https://gcc.gnu.org/onlinedocs/)\n' +
            '\n' +
            '```shell\n' +
            'nx build testtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Linting the test binary using [clang-tidy](https://clang.llvm.org/extra/clang-tidy/)\n' +
            '\n' +
            '```shell\n' +
            'nx lint testtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Formatting the test binary using [clang-format](https://clang.llvm.org/docs/ClangFormat.html)\n' +
            '\n' +
            '```shell\n' +
            'nx fmt testtest --output-style=stream\n' +
            '```\n' +
            '\n' +
            '## Testing the test binary using [ctest](https://cmake.org/cmake/help/latest/manual/ctest.1.html) and  [googletest](https://google.github.io/googletest/) \n' +
            '\n' +
            '```shell\n' +
            'nx test testtest --output-style=stream\n' +
            '```\n';
        defaultTest();
    });
});
