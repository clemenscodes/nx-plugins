import type { Tree } from '@nx/devkit';
import type { BinGeneratorSchema } from '../../schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateBinFiles } from './generateBinFiles';
import { resolveBinOptions } from '../resolveBinOptions/resolveBinOptions';

describe('generateBinFiles', () => {
    let tree: Tree;
    let options: BinGeneratorSchema;
    let expectedSourceFile: string;
    let expectedIncludeFile: string;
    let expectedListsFile: string;

    const defaultTest = () => {
        const resolvedOptions = resolveBinOptions(options);
        const { name, projectRoot, languageExtension } = resolvedOptions;
        const binarySourceFile = `${projectRoot}/src/${name}.${languageExtension}`;
        const binaryListsFile = `${projectRoot}/CMakeLists.txt`;
        const binaryIncludeFile = `${projectRoot}/include/${name}.h`;
        generateBinFiles(tree, resolvedOptions);
        const binaryRoot = tree.children(projectRoot);
        expect(binaryRoot).toStrictEqual([
            'CMakeLists.txt',
            'README.md',
            'include',
            'src',
        ]);
        expect(tree.exists(binarySourceFile)).toBe(true);
        expect(tree.exists(binaryListsFile)).toBe(true);
        expect(tree.exists(binaryIncludeFile)).toBe(true);
        const readIncludeFile = tree.read(binaryIncludeFile, 'utf8');
        const readSourceFile = tree.read(binarySourceFile, 'utf8');
        const readListsFile = tree.read(binaryListsFile, 'utf8');
        expect(readIncludeFile).toStrictEqual(expectedIncludeFile);
        expect(readSourceFile).toStrictEqual(expectedSourceFile);
        expect(readListsFile).toStrictEqual(expectedListsFile);
    };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };
        expectedSourceFile =
            '#include "test.h"\n' +
            '\n' +
            'int main(int argc, char *argv[]) {\n' +
            '    (void)argc;\n' +
            '    (void)argv;\n' +
            '    return test();\n' +
            '}\n';
        expectedListsFile =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'project(test CXX)\n' +
            'set_binary_settings(${CMAKE_PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR})\n';
        expectedIncludeFile =
            '#ifndef _TEST_TEST\n' + '#define _TEST_TEST\n' + '\n' + '#endif\n';
    });

    it('should generate a C++ binary', defaultTest);

    it('should generate a C library', () => {
        options.language = 'C';
        expectedListsFile =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'project(test C)\n' +
            'set_binary_settings(${CMAKE_PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR})\n';
        defaultTest();
    });
});
