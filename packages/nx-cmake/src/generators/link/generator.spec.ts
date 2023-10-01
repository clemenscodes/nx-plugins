import type { Tree } from '@nx/devkit';
import type { LinkGeneratorSchema } from './schema';
import type { LibGeneratorSchema } from '../library/schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import libGenerator from '../library/generator';
import linkGenerator from './generator';
import * as devkit from '@nx/devkit';
import { normalizeLineEndings } from '../../utils/testUtils/normalizeLineEndings/normalizeLineEndings';
import { readFileWithTree } from '../../utils/generatorUtils/readFileWithTree/readFileWithTree';

describe('link generator', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let linkOptions: LinkGeneratorSchema;
    let expectedCmakeFile: string;
    let expectedCmakeFileContent: string;
    let expectedUpdatedCmakeFileContent: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        libOptions = {
            name: 'link',
            language: 'C++',
            generateTests: true,
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await libGenerator(tree, libOptions);
        expectedCmakeFile = 'packages/link/CMakeLists.txt';
        expectedCmakeFileContent =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'set_project_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(liblink CXX)\n' +
            'set_library_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n';
        expectedUpdatedCmakeFileContent =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'set_project_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(liblink CXX)\n' +
            'set_library_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'link_shared_library(${CMAKE_PROJECT_NAME} target)\n';
        libOptions.name = 'target';
        await libGenerator(tree, libOptions);
        linkOptions = {
            source: 'liblink',
            target: 'libtarget',
            link: 'shared',
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should run successfully', async () => {
        const cmakeFileContent = readFileWithTree(tree, expectedCmakeFile);
        expect(normalizeLineEndings(cmakeFileContent)).toBe(
            expectedCmakeFileContent,
        );
        await linkGenerator(tree, linkOptions);
        const updatedCmakeFileContent = readFileWithTree(
            tree,
            expectedCmakeFile,
        );
        expect(normalizeLineEndings(updatedCmakeFileContent)).toBe(
            expectedUpdatedCmakeFileContent,
        );
    });
});
