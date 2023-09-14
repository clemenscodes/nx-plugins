import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateRootConfig } from './generateRootConfig';
import { InitGeneratorSchema } from '../../schema';

describe('generateRootConfig', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should generate root config', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: false,
            skipFormat: false,
        };
        generateRootConfig(tree, options);
        const rootConfig = 'CMakeLists.txt';
        expect(tree.exists(rootConfig)).toBe(true);
    });

    it('should generate root config correctly', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: false,
            skipFormat: false,
        };
        generateRootConfig(tree, options);
        const rootConfig = 'CMakeLists.txt';
        const readRootConfig = tree.read(rootConfig, 'utf-8');
        const expectedRootConfig =
            'get_filename_component(CURRENT_DIR "${CMAKE_CURRENT_LIST_FILE}" DIRECTORY)\n' +
            'list(APPEND CMAKE_MODULE_PATH ${CURRENT_DIR}/cmake)\n' +
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
            'make_var_readonly(WORKSPACE_INCLUDE_DIR ${WORKSPACE_DIR}/include)\n' +
            'make_var_readonly(WORKSPACE_LIBRARY_DIR ${WORKSPACE_DIR}/packages)\n' +
            'include_directories(SYSTEM ${WORKSPACE_LIBRARY_DIR})\n' +
            'set(CMAKE_INCLUDE_PATH ${WORKSPACE_INCLUDE_DIR})\n' +
            'set(CMAKE_LIBRARY_PATH ${WORKSPACE_DIR}/dist/packages)\n' +
            'set_global_settings()\n';

        expect(readRootConfig).toStrictEqual(expectedRootConfig);
    });
});
