import type { Tree } from '@nx/devkit';
import {
    getDefaultInitGeneratorOptions,
    type LibGeneratorSchema,
    type LibSchema,
} from '@/config';
import { readFileWithTree } from './readFileWithTree';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libGenerator } from '../libGenerator/libGenerator';
import { resolveLibOptions } from '../resolveLibOptions/resolveLibOptions';
import * as devkit from '@nx/devkit';
import { initGenerator } from '../initGenerator/initGenerator';

describe('writeFileWithTree', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let options: LibSchema;
    let expectedCmakeFile: string;
    let expectedCmakeFileContent: string;

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
    });

    it('should read the file correctly', () => {
        const readContent = readFileWithTree(tree, expectedCmakeFile);
        expect(readContent).toBe(expectedCmakeFileContent);
    });
});
