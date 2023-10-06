import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema, LinkSchema } from '@/types';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
    getCmakeLink,
    getSourceCmakeFile,
    getUpdatedCmakeFileContent,
    updateCmakeFile,
} from './updateCmakeFile';
import * as devkit from '@nx/devkit';
import { libGenerator } from '../libGenerator/libGenerator';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';

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
            newContent,
        );
        expect(normalizeLineEndings(updatedContent)).toBe(
            oldContent + newContent,
        );
    });

    it('should update cmake file', () => {
        const cmakeFileContent = readFileWithTree(tree, expectedCmakeFile);
        expect(normalizeLineEndings(cmakeFileContent)).toBe(
            expectedCmakeFileContent,
        );
        updateCmakeFile(tree, linkOptions);
        const updatedCmakeFileContent = readFileWithTree(
            tree,
            expectedCmakeFile,
        );
        expect(normalizeLineEndings(updatedCmakeFileContent)).toBe(
            expectedUpdatedCmakeFileContent,
        );
    });
});
