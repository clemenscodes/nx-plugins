import type { Tree } from '@nx/devkit';
import type { LinkSchema } from '../../schema';
import type { LibGeneratorSchema } from '../../../library/schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readFileWithTree } from '../../../../utils/generatorUtils/readFileWithTree/readFileWithTree';
import libGenerator from '../../../library/generator';
import {
    getCmakeLink,
    getSourceCmakeFile,
    getUpdatedCmakeFileContent,
    updateCmakeFile,
} from './updateCmakeFile';

describe('updateCmakeFile', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let linkOptions: LinkSchema;
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
            sourceProjectRoot: 'packages/link',
        };
    });

    it('should generate the correct CMake shared link', () => {
        const link = 'shared';
        const target = 'myTarget';
        const cmakeLink = getCmakeLink(link, target);
        const expected = `link_${link}_library($\{CMAKE_PROJECT_NAME} ${target})\n`;
        expect(cmakeLink).toBe(expected);
    });

    it('should generate the correct CMake shared link for a library', () => {
        const link = 'shared';
        const target = 'libtarget';
        const cmakeLink = getCmakeLink(link, target);
        const expected = `link_${link}_library($\{CMAKE_PROJECT_NAME} target)\n`;
        expect(cmakeLink).toBe(expected);
    });

    it('should generate the correct CMake shared link', () => {
        const link = 'static';
        const target = 'myTarget';
        const cmakeLink = getCmakeLink(link, target);
        const expected = `link_${link}_library($\{CMAKE_PROJECT_NAME} ${target})\n`;
        expect(cmakeLink).toBe(expected);
    });

    it('should generate the correct source CMake file path', () => {
        const sourceProjectRoot = '/path/to/source/project';
        const cmakeFile = getSourceCmakeFile(sourceProjectRoot);
        expect(cmakeFile).toBe('/path/to/source/project/CMakeLists.txt');
    });

    it('should get updated CMake file content correctly', () => {
        const oldContent = 'Old CMake content';
        const newContent = 'New CMake content';
        const updatedContent = getUpdatedCmakeFileContent(
            oldContent,
            newContent
        );
        expect(updatedContent).toBe(oldContent + newContent);
    });

    it('should update cmake file', () => {
        const cmakeFileContent = readFileWithTree(tree, expectedCmakeFile);
        expect(cmakeFileContent).toBe(expectedCmakeFileContent);
        updateCmakeFile(tree, linkOptions);
        const updatedCmakeFileContent = readFileWithTree(
            tree,
            expectedCmakeFile
        );
        expect(updatedCmakeFileContent).toBe(expectedUpdatedCmakeFileContent);
    });
});
