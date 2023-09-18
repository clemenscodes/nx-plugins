import type { Tree } from '@nx/devkit';
import type { LinkGeneratorSchema } from './schema';
import type { LibGeneratorSchema } from '../library/schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import libGenerator from '../library/generator';
import linkGenerator from './generator';

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
        expectedUpdatedCmakeFileContent =
            'include("../../CMakeLists.txt")\n' +
            '\n' +
            'cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})\n' +
            'project(liblink CXX)\n' +
            'set_library_settings(${CMAKE_PROJECT_NAME} ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'link_shared_library(${CMAKE_PROJECT_NAME} target)\n';
        libOptions.name = 'target';
        await libGenerator(tree, libOptions);
        linkOptions = {
            source: 'liblink',
            target: 'libtarget',
            link: 'shared',
            skipFormat: false,
        };
    });

    it('should run successfully', async () => {
        const cmakeFileContent = tree.read(expectedCmakeFile, 'utf-8');
        expect(cmakeFileContent).toBe(expectedCmakeFileContent);
        await linkGenerator(tree, linkOptions);
        const updatedCmakeFileContent = tree.read(expectedCmakeFile, 'utf-8');
        expect(updatedCmakeFileContent).toBe(expectedUpdatedCmakeFileContent);
    });
});
