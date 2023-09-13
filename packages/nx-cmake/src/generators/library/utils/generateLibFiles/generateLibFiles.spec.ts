import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';
import { LibGeneratorSchema } from '../../schema';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { generateLibFiles } from './generateLibFiles';

describe('generateLibFiles', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should generate a C++ library', () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };
        const resolvedOptions = resolveLibOptions(options);
        generateLibFiles(tree, resolvedOptions);
        const libraryRoot = tree.children(`packages/test`);
        const libraryListsFile = `packages/test/CMakeLists.txt`;
        const librarySourceFile = `packages/test/src/libtest.cpp`;
        const libraryIncludeFile = `packages/test/include/libtest.h`;
        expect(libraryRoot).toStrictEqual(['CMakeLists.txt', 'include', 'src']);
        expect(tree.exists(librarySourceFile));
        expect(tree.exists(libraryIncludeFile));
        const readIncludeFile = tree.read(libraryIncludeFile, 'utf8');
        const readSourceFile = tree.read(librarySourceFile, 'utf8');
        const readListsFile = tree.read(libraryListsFile, 'utf8');
        const expectedIncludeFile =
            '#ifndef _LIBTEST_TEST\n' +
            '#define _LIBTEST_TEST\n' +
            '\n' +
            'int test(int argc, char *argv[]);\n' +
            '\n' +
            '#endif\n';
        const expectedSourceFile =
            '#include <test/include/libtest.h>\n' +
            '\n' +
            'int test(int argc, char *argv[]) {\n' +
            '    (void)argc;\n' +
            '    (void)argv;\n' +
            '    return 0;\n' +
            '}\n';
        const expectedListsFile =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'project(libtest CXX)\n' +
            'set_library_settings(${CMAKE_PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR})\n';
        expect(readIncludeFile).toStrictEqual(expectedIncludeFile);
        expect(readSourceFile).toStrictEqual(expectedSourceFile);
        expect(readListsFile).toStrictEqual(expectedListsFile);
    });

    it('should generate a C library', () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C',
            skipFormat: false,
            generateTests: false,
        };
        const resolvedOptions = resolveLibOptions(options);
        generateLibFiles(tree, resolvedOptions);
        const libraryRoot = tree.children(`packages/test`);
        const libraryListsFile = `packages/test/CMakeLists.txt`;
        const librarySourceFile = `packages/test/src/libtest.c`;
        const libraryIncludeFile = `packages/test/include/libtest.h`;
        expect(libraryRoot).toStrictEqual(['CMakeLists.txt', 'include', 'src']);
        expect(tree.exists(librarySourceFile));
        expect(tree.exists(libraryIncludeFile));
        const readIncludeFile = tree.read(libraryIncludeFile, 'utf8');
        const readSourceFile = tree.read(librarySourceFile, 'utf8');
        const readListsFile = tree.read(libraryListsFile, 'utf8');
        const expectedIncludeFile =
            '#ifndef _LIBTEST_TEST\n' +
            '#define _LIBTEST_TEST\n' +
            '\n' +
            'int test(int argc, char *argv[]);\n' +
            '\n' +
            '#endif\n';
        const expectedSourceFile =
            '#include <test/include/libtest.h>\n' +
            '\n' +
            'int test(int argc, char *argv[]) {\n' +
            '    (void)argc;\n' +
            '    (void)argv;\n' +
            '    return 0;\n' +
            '}\n';
        const expectedListsFile =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'project(libtest C)\n' +
            'set_library_settings(${CMAKE_PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR})\n';
        expect(readIncludeFile).toStrictEqual(expectedIncludeFile);
        expect(readSourceFile).toStrictEqual(expectedSourceFile);
        expect(readListsFile).toStrictEqual(expectedListsFile);
    });
});
