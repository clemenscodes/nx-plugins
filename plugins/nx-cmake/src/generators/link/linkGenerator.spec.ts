import type { Tree } from '@nx/devkit';
import { linkGenerator } from './linkGenerator';
import { trimLib, normalizeLineEndings, readFileWithTree } from '@/util';
import initGenerator from '../init/initGenerator';
import { libGenerator } from '../library/libGenerator';
import {
    LibGeneratorSchema,
    LibSchema,
    LinkGeneratorSchema,
} from '../generator';
import { getDefaultInitGeneratorOptions } from '../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import { resolveLibOptions } from '../library/resolveLibOptions/resolveLibOptions';
import { setupWorkspace } from '@/mocks';

describe('link generator', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let options: LibSchema;
    let linkOptions: LinkGeneratorSchema;
    let expectedCmakeFile: string;
    let expectedCmakeFileContent: string;
    let expectedUpdatedCmakeFileContent: string;

    beforeEach(async () => {
        tree = setupWorkspace();
        libOptions = {
            name: 'link',
            language: 'C++',
            generateTests: true,
        };
        linkOptions = {
            source: 'liblink',
            target: 'libtarget',
        };
        options = resolveLibOptions(libOptions);
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        await libGenerator(tree, libOptions);
        expectedCmakeFile = 'packages/link/CMakeLists.txt';
        expectedCmakeFileContent =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE ${options.cmakeC})\n` +
            '\n' +
            `set_project_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(${options.libName} LANGUAGES \${LANGUAGE} VERSION \${${options.libName}_VERSION})\n` +
            '\n' +
            `set_library_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(${options.libName})\n` +
            '\n' +
            `set_package_version(${options.libName} \${${options.libName}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            '    cmake/liblinkConfig.cmake.in\n' +
            '    ${CMAKE_CURRENT_BINARY_DIR}/liblinkConfig.cmake\n' +
            '    INSTALL_DESTINATION ${liblink_INSTALL_CMAKEDIR}\n' +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT ${options.libName}_Targets\n` +
            `    NAMESPACE ${options.libName}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE ${options.libName})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}ConfigVersion.cmake\n` +
            `    DESTINATION \${${options.libName}_INSTALL_CMAKEDIR}\n` +
            ')\n';

        expectedUpdatedCmakeFileContent =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE ${options.cmakeC})\n` +
            '\n' +
            `set_project_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(${options.libName} LANGUAGES \${LANGUAGE} VERSION \${${options.libName}_VERSION})\n` +
            '\n' +
            `set_library_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(${options.libName})\n` +
            '\n' +
            `set_package_version(${options.libName} \${${options.libName}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            '    cmake/liblinkConfig.cmake.in\n' +
            '    ${CMAKE_CURRENT_BINARY_DIR}/liblinkConfig.cmake\n' +
            '    INSTALL_DESTINATION ${liblink_INSTALL_CMAKEDIR}\n' +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT ${options.libName}_Targets\n` +
            `    NAMESPACE ${options.libName}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE ${options.libName})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/${options.libName}ConfigVersion.cmake\n` +
            `    DESTINATION \${${options.libName}_INSTALL_CMAKEDIR}\n` +
            ')\n' +
            '\n' +
            `link_library(\${CMAKE_PROJECT_NAME} ${trimLib(
                linkOptions.target,
            )})\n`;
        libOptions.name = 'target';
        await libGenerator(tree, libOptions);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should run successfully', () => {
        const cmakeFileContent = readFileWithTree(tree, expectedCmakeFile);
        expect(normalizeLineEndings(cmakeFileContent)).toBe(
            expectedCmakeFileContent,
        );
        linkGenerator(tree, linkOptions);
        const updatedCmakeFileContent = readFileWithTree(
            tree,
            expectedCmakeFile,
        );
        expect(normalizeLineEndings(updatedCmakeFileContent)).toBe(
            expectedUpdatedCmakeFileContent,
        );
    });
});
