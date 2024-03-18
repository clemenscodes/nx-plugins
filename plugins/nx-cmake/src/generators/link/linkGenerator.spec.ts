import type { Tree } from '@nx/devkit';
import { trimLib, normalizeLineEndings } from '@/util';
import { setupWorkspace } from '@/mocks';
import { readFileWithTree } from '@/file';
import { linkGenerator } from './linkGenerator';
import { getDefaultInitGeneratorOptions } from '../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import { resolveLibOptions } from '../library/resolveLibOptions/resolveLibOptions';
import {
    LibGeneratorSchema,
    LibSchema,
    LinkGeneratorSchema,
} from '../generator';
import initGenerator from '../init/initGenerator';
import libGenerator from '../library/libGenerator';

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
            `set(PROJECT_NAME ${linkOptions.source})\n` +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE ${options.cmakeC})\n` +
            '\n' +
            `set_project_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(\${PROJECT_NAME} LANGUAGES \${LANGUAGE} VERSION \${\${PROJECT_NAME}_VERSION})\n` +
            '\n' +
            `set_library_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(\${PROJECT_NAME})\n` +
            '\n' +
            `set_package_version(\${PROJECT_NAME} \${\${PROJECT_NAME}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            '    cmake/${PROJECT_NAME}Config.cmake.in\n' +
            '    ${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}Config.cmake\n' +
            '    INSTALL_DESTINATION ${${PROJECT_NAME}_INSTALL_CMAKEDIR}\n' +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT \${PROJECT_NAME}_Targets\n` +
            `    NAMESPACE \${PROJECT_NAME}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE \${PROJECT_NAME})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}ConfigVersion.cmake\n` +
            `    DESTINATION \${\${PROJECT_NAME}_INSTALL_CMAKEDIR}\n` +
            ')\n';

        expectedUpdatedCmakeFileContent =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            `set(PROJECT_NAME ${linkOptions.source})\n` +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE ${options.cmakeC})\n` +
            '\n' +
            `set_project_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project(\${PROJECT_NAME} LANGUAGES \${LANGUAGE} VERSION \${\${PROJECT_NAME}_VERSION})\n` +
            '\n' +
            `set_library_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            '\n' +
            `set_library_install_destination(\${PROJECT_NAME})\n` +
            '\n' +
            `set_package_version(\${PROJECT_NAME} \${\${PROJECT_NAME}_VERSION})\n` +
            '\n' +
            'configure_package_config_file(\n' +
            '    cmake/${PROJECT_NAME}Config.cmake.in\n' +
            '    ${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}Config.cmake\n' +
            '    INSTALL_DESTINATION ${${PROJECT_NAME}_INSTALL_CMAKEDIR}\n' +
            ')\n' +
            '\n' +
            'export(\n' +
            `    EXPORT \${PROJECT_NAME}_Targets\n` +
            `    NAMESPACE \${PROJECT_NAME}::\n` +
            `    FILE \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}_Targets.cmake\n` +
            ')\n' +
            '\n' +
            `export(PACKAGE \${PROJECT_NAME})\n` +
            '\n' +
            'install(FILES\n' +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}Config.cmake\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}ConfigVersion.cmake\n` +
            `    DESTINATION \${\${PROJECT_NAME}_INSTALL_CMAKEDIR}\n` +
            ')\n' +
            '\n' +
            `link_library(\${PROJECT_NAME} ${trimLib(linkOptions.target)})\n`;
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
