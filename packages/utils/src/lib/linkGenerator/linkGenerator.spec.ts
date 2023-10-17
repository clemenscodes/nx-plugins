import type {
    LibGeneratorSchema,
    LibSchema,
    LinkGeneratorSchema,
} from '@/config';
import type { Tree } from '@nx/devkit';
import { getDefaultInitGeneratorOptions } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';
import { linkGenerator } from './linkGenerator';
import { libGenerator } from '../libGenerator/libGenerator';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import { initGenerator } from '../initGenerator/initGenerator';
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
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        await libGenerator(tree, libOptions);
        expectedCmakeFile = 'packages/link/CMakeLists.txt';
        expectedCmakeFileContent =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            '\n' +
            `cmake_minimum_required(VERSION 3.21)\n` +
            `set_project_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            `project(${options.libName} CXX)\n` +
            `set_library_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            `install(TARGETS ${options.libName} EXPORT ${options.libName}Targets\n` +
            '    LIBRARY DESTINATION lib\n' +
            '    ARCHIVE DESTINATION lib\n' +
            '    RUNTIME DESTINATION include\n' +
            ')\n' +
            `install(EXPORT ${options.libName}Targets\n` +
            `    FILE ${options.libName}Targets.cmake\n` +
            `    NAMESPACE ${options.libName}::\n` +
            `    DESTINATION lib/cmake/${options.libName}\n` +
            ')\n' +
            '\n' +
            'include(CMakePackageConfigHelpers)\n' +
            `write_basic_package_version_file("${options.libName}ConfigVersion.cmake"\n` +
            '    VERSION 0.0.1\n' +
            '    COMPATIBILITY SameMajorVersion\n' +
            ')\n' +
            `install(FILES "${options.libName}Config.cmake" "${options.libName}ConfigVersion.cmake"\n` +
            `    DESTINATION lib/cmake/${options.libName}\n` +
            ')\n';
        expectedUpdatedCmakeFileContent =
            `include(${options.relativeRootPath}${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            '\n' +
            `cmake_minimum_required(VERSION 3.21)\n` +
            `set_project_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            `project(${options.libName} CXX)\n` +
            `set_library_settings(${options.libName} \${CMAKE_CURRENT_SOURCE_DIR})\n` +
            '\n' +
            'include(GNUInstallDirs)\n' +
            `install(TARGETS ${options.libName} EXPORT ${options.libName}Targets\n` +
            '    LIBRARY DESTINATION lib\n' +
            '    ARCHIVE DESTINATION lib\n' +
            '    RUNTIME DESTINATION include\n' +
            ')\n' +
            `install(EXPORT ${options.libName}Targets\n` +
            `    FILE ${options.libName}Targets.cmake\n` +
            `    NAMESPACE ${options.libName}::\n` +
            `    DESTINATION lib/cmake/${options.libName}\n` +
            ')\n' +
            '\n' +
            'include(CMakePackageConfigHelpers)\n' +
            `write_basic_package_version_file("${options.libName}ConfigVersion.cmake"\n` +
            '    VERSION 0.0.1\n' +
            '    COMPATIBILITY SameMajorVersion\n' +
            ')\n' +
            `install(FILES "${options.libName}Config.cmake" "${options.libName}ConfigVersion.cmake"\n` +
            `    DESTINATION lib/cmake/${options.libName}\n` +
            ')\n';
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
