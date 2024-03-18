import type { Tree } from '@nx/devkit';
import { join } from 'path';
import { trimLib, normalizeLineEndings } from '@/util';
import { readFileWithTree } from '@/file';
import { setupWorkspace } from '@/mocks';
import { LibSchema, LinkSchema } from '../../generator';
import { getDefaultInitGeneratorOptions } from '../../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import { resolveLibOptions } from '../../library/resolveLibOptions/resolveLibOptions';
import {
    getCmakeLink,
    getSourceCmakeFile,
    updateCmakeFile,
} from './updateCmakeFile';
import initGenerator from '../../init/initGenerator';
import libGenerator from '../../library/libGenerator';

describe('updateCmakeFile', () => {
    let tree: Tree;
    let libOptions: LibSchema;
    let linkOptions: LinkSchema;
    let expectedCmakeFile: string;
    let expectedCmakeFileContent: string;
    let expectedUpdatedCmakeFileContent: string;

    beforeEach(async () => {
        tree = setupWorkspace();
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
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        await libGenerator(tree, libOptions);
        expectedCmakeFile = 'packages/link/CMakeLists.txt';
        expectedCmakeFileContent =
            `include(${libOptions.relativeRootPath}${libOptions.cmakeConfigDir}/${libOptions.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            `set(PROJECT_NAME ${linkOptions.source})\n` +
            `set(PROJECT_TYPE LIB)\n` +
            `set(LANGUAGE ${libOptions.cmakeC})\n` +
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
            `    cmake/\${PROJECT_NAME}Config.cmake.in\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}Config.cmake\n` +
            `    INSTALL_DESTINATION \${\${PROJECT_NAME}_INSTALL_CMAKEDIR}\n` +
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
            `include(${libOptions.relativeRootPath}${libOptions.cmakeConfigDir}/${libOptions.workspaceName}.cmake)\n` +
            'include(cmake/version.cmake)\n' +
            '\n' +
            'cmake_minimum_required(VERSION 3.21)\n' +
            '\n' +
            `set(PROJECT_NAME ${linkOptions.source})\n` +
            'set(PROJECT_TYPE LIB)\n' +
            `set(LANGUAGE ${libOptions.cmakeC})\n` +
            '\n' +
            `set_project_settings(\${PROJECT_NAME} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            `project($\{PROJECT_NAME} LANGUAGES \${LANGUAGE} VERSION \${\${PROJECT_NAME}_VERSION})\n` +
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
            `    cmake/\${PROJECT_NAME}Config.cmake.in\n` +
            `    \${CMAKE_CURRENT_BINARY_DIR}/\${PROJECT_NAME}Config.cmake\n` +
            `    INSTALL_DESTINATION \${\${PROJECT_NAME}_INSTALL_CMAKEDIR}\n` +
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

    it('should generate the correct CMake command', () => {
        const target = 'myTarget';
        const cmakeLink = getCmakeLink(target);
        const expected = `link_library($\{PROJECT_NAME} ${target})\n`;
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
