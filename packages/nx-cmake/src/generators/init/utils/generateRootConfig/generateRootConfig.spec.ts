import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateRootConfig } from './generateRootConfig';
import { readFileWithTree } from '../../../../utils/generatorUtils/readFileWithTree/readFileWithTree';
import { normalizeLineEndings } from '../../../../utils/testUtils/normalizeLineEndings/normalizeLineEndings';

describe('generateRootConfig', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let rootConfig: string;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            language: 'C',
            cmakeConfigDir: '.cmake',
            globalIncludeDir: 'include',
            appsDir: 'bin',
            libsDir: 'libs',
            addClangPreset: false,
            skipFormat: false,
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
            'include(FetchContent)\n' +
            'include(utils/make_var_readonly)\n' +
            'include(utils/print_variables)\n' +
            'include(utils/link_shared_library)\n' +
            'include(utils/link_static_library)\n' +
            'include(utils/link_cmocka)\n' +
            'include(utils/link_gtest)\n' +
            'include(utils/install_cmocka)\n' +
            'include(utils/install_gtest)\n' +
            'include(settings/set_global_settings)\n' +
            'include(settings/set_library_settings)\n' +
            'include(settings/set_binary_settings)\n' +
            'make_var_readonly(WORKSPACE_DIR ${CURRENT_DIR})\n' +
            `make_var_readonly(WORKSPACE_INCLUDE_DIR \${WORKSPACE_DIR}/${options.globalIncludeDir})\n` +
            `make_var_readonly(WORKSPACE_LIBRARY_DIR \${WORKSPACE_DIR}/${options.libsDir})\n` +
            'include_directories(SYSTEM ${WORKSPACE_LIBRARY_DIR})\n' +
            'set(CMAKE_INCLUDE_PATH ${WORKSPACE_INCLUDE_DIR})\n' +
            `set(CMAKE_LIBRARY_PATH \${WORKSPACE_DIR}/dist/${options.libsDir})\n` +
            'set_global_settings()\n' +
            'if(${CMAKE_SYSTEM_NAME} MATCHES "Darwin")\n' +
            '    set(CMAKE_C_COMPILER gcc-13)\n' +
            '    set(CMAKE_CXX_COMPILER ${CMAKE_C_COMPILER})\n' +
            'else()\n' +
            '    set(CMAKE_C_COMPILER gcc)\n' +
            '    set(CMAKE_CXX_COMPILER ${CMAKE_C_COMPILER})\n' +
            'endif()\n';
        expect(readRootConfig).toBe(normalizeLineEndings(expectedRootConfig));
    });
});
