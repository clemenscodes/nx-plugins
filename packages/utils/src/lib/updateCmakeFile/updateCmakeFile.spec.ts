import type { Tree } from '@nx/devkit';
import type { LibSchema, LinkSchema } from '@/config';
import { getDefaultInitGeneratorOptions } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libGenerator } from '../libGenerator/libGenerator';
import { initGenerator } from '../initGenerator/initGenerator';
import { join } from 'path';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import {
    getCmakeLink,
    getSourceCmakeFile,
    updateCmakeFile,
} from './updateCmakeFile';
import * as devkit from '@nx/devkit';
import { trimLib, normalizeLineEndings, readFileWithTree } from '@/util';

describe('updateCmakeFile', () => {
    let tree: Tree;
    let libOptions: LibSchema;
    let linkOptions: LinkSchema;
    let expectedCmakeFile: string;
    let expectedCmakeFileContent: string;
    let expectedUpdatedCmakeFileContent: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        libOptions = resolveLibOptions({
            name: 'link',
            language: 'C++',
            generateTests: true,
        });
        linkOptions = {
            source: 'liblink',
            target: 'libtarget',
            sourceProjectRoot: 'packages/link',
            targetProjectRoot: 'packages/target',
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        await libGenerator(tree, libOptions);
        expectedCmakeFile = 'packages/link/CMakeLists.txt';
        expectedCmakeFileContent =
            `include(${libOptions.relativeRootPath}${libOptions.cmakeConfigDir}/${libOptions.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE ${libOptions.cmakeC})\n` +
            '\n' +
            `set_project_settings(${libOptions.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(${libOptions.libName} LANGUAGES \${LANGUAGE} VERSION \${${libOptions.libName}_VERSION})\n` +
            '\n' +
            `set_library_settings(${libOptions.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(${libOptions.libName})\n` +
            '\n' +
            `set_package_version(${libOptions.libName} \${${libOptions.libName}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            '    cmake/liblinkConfig.cmake.in\n' +
            '    ${CMAKE_CURRENT_BINARY_DIR}/liblinkConfig.cmake\n' +
            '    INSTALL_DESTINATION ${liblink_INSTALL_CMAKEDIR}\n' +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT ${libOptions.libName}_Targets\n` +
            `    NAMESPACE ${libOptions.libName}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/${libOptions.libName}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE ${libOptions.libName})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${libOptions.libName}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${libOptions.libName}ConfigVersion.cmake\n` +
            `    DESTINATION \${${libOptions.libName}_INSTALL_CMAKEDIR}\n` +
            ')\n';
        expectedUpdatedCmakeFileContent =
            `include(${libOptions.relativeRootPath}${libOptions.cmakeConfigDir}/${libOptions.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE ${libOptions.cmakeC})\n` +
            '\n' +
            `set_project_settings(${libOptions.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(${libOptions.libName} LANGUAGES \${LANGUAGE} VERSION \${${libOptions.libName}_VERSION})\n` +
            '\n' +
            `set_library_settings(${libOptions.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(${libOptions.libName})\n` +
            '\n' +
            `set_package_version(${libOptions.libName} \${${libOptions.libName}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            '    cmake/liblinkConfig.cmake.in\n' +
            '    ${CMAKE_CURRENT_BINARY_DIR}/liblinkConfig.cmake\n' +
            '    INSTALL_DESTINATION ${liblink_INSTALL_CMAKEDIR}\n' +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT ${libOptions.libName}_Targets\n` +
            `    NAMESPACE ${libOptions.libName}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/${libOptions.libName}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE ${libOptions.libName})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${libOptions.libName}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${libOptions.libName}ConfigVersion.cmake\n` +
            `    DESTINATION \${${libOptions.libName}_INSTALL_CMAKEDIR}\n` +
            ')\n' +
            '\n' +
            `link_library(\${CMAKE_PROJECT_NAME} ${trimLib(
                linkOptions.target,
            )})\n`;
        libOptions.name = 'target';
        await libGenerator(tree, libOptions);
    });

    it('should generate the correct CMake command', () => {
        const target = 'myTarget';
        const cmakeLink = getCmakeLink(target);
        const expected = `link_library($\{CMAKE_PROJECT_NAME} ${target})\n`;
        expect(cmakeLink).toBe(expected);
    });

    it('should generate the correct source CMake file path', () => {
        const sourceProjectRoot = join('/path/to/source/project');
        const cmakeFile = getSourceCmakeFile(sourceProjectRoot);
        expect(cmakeFile).toBe(join('/path/to/source/project/CMakeLists.txt'));
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
