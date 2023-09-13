import {
    getCmakeLink,
    getSourceCmakeFile,
    getUpdatedCmakeFileContent,
    linkLibrary,
    readCmakeFile,
    writeCmakeFile,
} from './linkLibrary';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import type { Tree } from '@nx/devkit';
import type { LinkSchema } from '../../schema';
import type { LibGeneratorSchema } from '../../../library/schema';
import libGenerator from '../../../library/generator';

describe('linkLibrary', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let linkOptions: LinkSchema;
    let expectedCmakeFile: string;
    let expectedCmakeLink: string;
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
        expectedCmakeLink =
            'link_shared_library(${CMAKE_PROJECT_NAME} target)\n';
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
            'link_shared_library(${CMAKE_PROJECT_NAME} libtarget)\n';
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

    it('should read the CMake file correctly', () => {
        const readContent = readCmakeFile(tree, expectedCmakeFile);
        expect(readContent).toBe(expectedCmakeFileContent);
    });

    it('should write the CMake file correctly', () => {
        const newContent = getUpdatedCmakeFileContent(
            expectedCmakeFileContent,
            expectedCmakeLink
        );
        const updatedCmakeFileContent = writeCmakeFile(
            tree,
            expectedCmakeFile,
            newContent
        );
        expect(updatedCmakeFileContent).toBe(newContent);
    });

    it('should link library', () => {
        const cmakeFileContent = tree.read(expectedCmakeFile, 'utf-8');
        expect(cmakeFileContent).toBe(expectedCmakeFileContent);
        linkLibrary(tree, linkOptions);
        const updatedCmakeFileContent = tree.read(expectedCmakeFile, 'utf-8');
        expect(updatedCmakeFileContent).toBe(expectedUpdatedCmakeFileContent);
    });
});
