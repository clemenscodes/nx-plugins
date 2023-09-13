import { readFileWithTree } from './readFileWithTree';
import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema } from './../../../generators/library/schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import libGenerator from './../../../generators/library/generator';

describe('writeFileWithTree', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let expectedCmakeFile: string;
    let expectedCmakeFileContent: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        libOptions = {
            name: 'link',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };
        await libGenerator(tree, libOptions);
        expectedCmakeFile = 'packages/link/CMakeLists.txt';
        expectedCmakeFileContent =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'project(liblink CXX)\n' +
            'set_library_settings(${CMAKE_PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR})\n';
    });

    it('should read the file correctly', () => {
        const readContent = readFileWithTree(tree, expectedCmakeFile);
        expect(readContent).toBe(expectedCmakeFileContent);
    });
});
