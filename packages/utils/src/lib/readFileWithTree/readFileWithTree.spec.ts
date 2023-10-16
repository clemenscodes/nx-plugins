import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema, LibSchema } from '@/config';
import { readFileWithTree } from './readFileWithTree';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libGenerator } from '../libGenerator/libGenerator';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import * as devkit from '@nx/devkit';

describe('writeFileWithTree', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let options: LibSchema;
    let expectedCmakeFile: string;
    let expectedCmakeFileContent: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        libOptions = {
            name: 'link',
            language: 'C++',
            generateTests: true,
        };
        options = resolveLibOptions(libOptions);
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await libGenerator(tree, libOptions);
        expectedCmakeFile = 'packages/link/CMakeLists.txt';
        expectedCmakeFileContent =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            `cmake_minimum_required(VERSION 3.21)\n` +
            'set_project_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(liblink CXX)\n' +
            'set_library_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n';
    });

    it('should read the file correctly', () => {
        const readContent = readFileWithTree(tree, expectedCmakeFile);
        expect(readContent).toBe(expectedCmakeFileContent);
    });
});
