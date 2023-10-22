import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '@/config';
import { getDefaultInitGeneratorOptions } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateRootConfig } from './generateRootConfig';
import { normalizeLineEndings, readFileWithTree } from '@/util';

describe('generateRootConfig', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let rootConfig: string;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            ...getDefaultInitGeneratorOptions(),
            workspaceName: 'workspace',
        };
        rootConfig = 'CMakeLists.txt';
    });

    it('should generate root config', async () => {
        generateRootConfig(tree, options);
        expect(tree.exists(rootConfig)).toBe(true);
    });

    it('should generate root config correctly', async () => {
        generateRootConfig(tree, options);
        const readRootConfig = readFileWithTree(tree, rootConfig);
        const expectedRootConfig =
            `cmake_minimum_required(VERSION 3.21)\n` +
            `\n` +
            `include(${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            `\n` +
            `project(${options.workspaceName} ${options.language})\n` +
            `\n` +
            'macro(find_package)\n' +
            '    if(NOT "${ARGV0}" IN_LIST LIBRARIES)\n' +
            '        message(STATUS "using native find_package for ${ARGV0}: ${ARGV}")\n' +
            '        _find_package(${ARGV})\n' +
            '    endif()\n' +
            'endmacro()\n' +
            '\n' +
            'foreach(SUB_DIRECTORY ${SUB_DIRECTORIES})\n' +
            '    message("Adding subdirectory: ${SUB_DIRECTORY}")\n' +
            '    add_subdirectory(${SUB_DIRECTORY})\n' +
            'endforeach()\n';
        expect(readRootConfig).toBe(normalizeLineEndings(expectedRootConfig));
    });
});
