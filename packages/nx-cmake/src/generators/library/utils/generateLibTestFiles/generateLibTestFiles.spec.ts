import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { LibGeneratorSchema } from '../../schema';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { generateLibTestFiles } from './generateLibTestFiles';

describe('generateLibTestFiles', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should not generate a C++ test library', () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };
        const resolvedOptions = resolveLibOptions(options);
        generateLibTestFiles(tree, resolvedOptions);

        expect(() =>
            readProjectConfiguration(tree, resolvedOptions.testName)
        ).toThrow("Cannot find configuration for 'testtest'");
    });

    it('should generate a C test library', () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C',
            skipFormat: false,
            generateTests: true,
        };
        const resolvedOptions = resolveLibOptions(options);
        generateLibTestFiles(tree, resolvedOptions);
        const libraryRoot = tree.children(`packages/test/test`);
        const libraryListsFile = `packages/test/test/CMakeLists.txt`;
        const librarySourceFile = `packages/test/test/src/testtest.c`;
        const libraryIncludeFile = `packages/test/test/include/testtest.h`;
        expect(libraryRoot).toStrictEqual([
            'CMakeLists.txt',
            'README.md',
            'include',
            'src',
        ]);
        expect(tree.exists(librarySourceFile));
        expect(tree.exists(libraryIncludeFile));
        const readIncludeFile = tree.read(libraryIncludeFile, 'utf8');
        const readSourceFile = tree.read(librarySourceFile, 'utf8');
        const readListsFile = tree.read(libraryListsFile, 'utf8');
        const expectedIncludeFile =
            '#ifndef _TESTTEST_TEST\n' +
            '#define _TESTTEST_TEST\n' +
            '\n' +
            '#include "libcmocka.h"\n' +
            '#include <test/include/libtest.h>\n' +
            '\n' +
            '#endif\n';

        const expectedSourceFile =
            '#include <test/test/include/testtest.h>\n' +
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

        const expectedListsFile =
            'include("../../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'project(testtest C)\n' +
            'set_binary_settings(${CMAKE_PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'link_static_library(${CMAKE_PROJECT_NAME} test)\n' +
            'enable_testing()\n' +
            'link_cmocka(${CMAKE_PROJECT_NAME})\n' +
            '\n' +
            'add_test(UnitTests testtest)\n';

        expect(readIncludeFile).toStrictEqual(expectedIncludeFile);
        expect(readSourceFile).toStrictEqual(expectedSourceFile);
        expect(readListsFile).toStrictEqual(expectedListsFile);
    });

    it('should generate a C++ test library', () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };
        const resolvedOptions = resolveLibOptions(options);
        generateLibTestFiles(tree, resolvedOptions);
        const libraryRoot = tree.children(`packages/test/test`);
        const libraryListsFile = `packages/test/test/CMakeLists.txt`;
        const librarySourceFile = `packages/test/test/src/testtest.cpp`;
        const libraryIncludeFile = `packages/test/test/include/testtest.h`;
        expect(libraryRoot).toStrictEqual([
            'CMakeLists.txt',
            'README.md',
            'include',
            'src',
        ]);
        expect(tree.exists(librarySourceFile));
        expect(tree.exists(libraryIncludeFile));
        const readIncludeFile = tree.read(libraryIncludeFile, 'utf8');
        const readSourceFile = tree.read(librarySourceFile, 'utf8');
        const readListsFile = tree.read(libraryListsFile, 'utf8');
        const expectedIncludeFile =
            '#ifndef _TESTTEST_TEST\n' +
            '#define _TESTTEST_TEST\n' +
            '\n' +
            '#include "libgtest.h"\n' +
            '#include <test/include/libtest.h>\n' +
            '\n' +
            '#endif\n';

        const expectedSourceFile =
            '#include <test/test/include/testtest.h>\n' +
            '\n' +
            'TEST(libtest, test_test) {\n' +
            '\tEXPECT_EQ(test(), 0);\n' +
            '}\n' +
            '\n';

        const expectedListsFile =
            'include("../../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'project(testtest CXX)\n' +
            'set_binary_settings(${CMAKE_PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'link_static_library(${CMAKE_PROJECT_NAME} test)\n' +
            'enable_testing()\n' +
            'link_gtest(${CMAKE_PROJECT_NAME})\n' +
            'include(GoogleTest)\n' +
            'gtest_discover_tests(testtest)\n';

        expect(readIncludeFile).toStrictEqual(expectedIncludeFile);
        expect(readSourceFile).toStrictEqual(expectedSourceFile);
        expect(readListsFile).toStrictEqual(expectedListsFile);
    });
});
