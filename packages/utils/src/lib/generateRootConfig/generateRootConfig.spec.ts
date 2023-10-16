import type { Tree } from '@nx/devkit';
import {
    getDefaultInitGeneratorOptions,
    type InitGeneratorSchema,
} from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateRootConfig } from './generateRootConfig';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';

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
            'get_filename_component(CURRENT_DIR "${CMAKE_CURRENT_LIST_FILE}" DIRECTORY)\n' +
            `list(APPEND CMAKE_MODULE_PATH \${CURRENT_DIR}/${options.cmakeConfigDir})\n` +
            'cmake_policy(SET CMP0003 NEW)\n' +
            'cmake_policy(SET CMP0011 NEW)\n' +
            'cmake_policy(SET CMP0054 NEW)\n' +
            'include(modules)\n' +
            'make_var_readonly(WORKSPACE_DIR ${CURRENT_DIR})\n' +
            `make_var_readonly(WORKSPACE_INCLUDE_DIR \${WORKSPACE_DIR}/${options.globalIncludeDir})\n` +
            `make_var_readonly(WORKSPACE_LIBRARY_DIR \${WORKSPACE_DIR}/${options.libsDir})\n` +
            'include_directories(SYSTEM ${WORKSPACE_LIBRARY_DIR})\n' +
            'set(CMAKE_INCLUDE_PATH ${WORKSPACE_INCLUDE_DIR})\n' +
            `set(CMAKE_LIBRARY_PATH \${WORKSPACE_DIR}/dist/${options.libsDir})\n` +
            `project(${options.workspaceName} ${options.language})\n` +
            'set_global_settings()\n' +
            'add_projects()\n';
        expect(readRootConfig).toBe(normalizeLineEndings(expectedRootConfig));
    });
});
