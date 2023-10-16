import type {
    LibGeneratorSchema,
    LibSchema,
    LinkGeneratorSchema,
} from '@/config';
import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';
import { linkGenerator } from './linkGenerator';
import { libGenerator } from '../libGenerator/libGenerator';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import * as devkit from '@nx/devkit';

describe('link generator', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let options: LibSchema;
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
        options = resolveLibOptions(libOptions);
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await libGenerator(tree, libOptions);
        expectedCmakeFile = 'packages/link/CMakeLists.txt';
        expectedCmakeFileContent =
            `include("${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}")\n` +
            'set_project_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(liblink CXX)\n' +
            'set_library_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n';
        expectedUpdatedCmakeFileContent =
            `include("${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}")\n` +
            'set_project_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n' +
            'project(liblink CXX)\n' +
            'set_library_settings(liblink ${CMAKE_CURRENT_SOURCE_DIR})\n';
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
