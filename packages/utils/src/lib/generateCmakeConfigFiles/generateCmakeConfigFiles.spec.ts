import type { Tree } from '@nx/devkit';
import type { InitSchema } from '@/config';
import { getDefaultInitGeneratorOptions } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateCmakeConfigFiles } from './generateCmakeConfigFiles';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';

describe('generateCmakeConfigFiles', () => {
    let tree: Tree;
    let options: InitSchema;
    let expectedCmakeSettingsFiles: string[];
    let expectedCmakeUtilsFiles: string[];

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        options = getDefaultInitGeneratorOptions();
        expectedCmakeSettingsFiles = [
            'set_binary_settings.cmake',
            'set_compiler_settings.cmake',
            'set_policies.cmake',
            'set_global_settings.cmake',
            'set_library_settings.cmake',
            'set_project_settings.cmake',
        ];
        expectedCmakeUtilsFiles = [
            'add_subdirectories.cmake',
            'install_cmocka.cmake',
            'install_gtest.cmake',
            'link_cmocka.cmake',
            'link_gtest.cmake',
            'link_shared_library.cmake',
            'link_static_library.cmake',
            'print_variables.cmake',
        ];
    });

    it('should generate cmake config in cmakeConfigDir', async () => {
        generateCmakeConfigFiles(tree, options);
        const cmakeChildren = tree.children(options.cmakeConfigDir);
        const expectedCmakeChildren = [
            'settings',
            'utils',
            `${options.workspaceName}.cmake`,
            'subdirectories.cmake',
            'modules.cmake',
        ];
        expect(cmakeChildren).toStrictEqual(
            expect.arrayContaining(expectedCmakeChildren),
        );
    });

    it('should generate cmake config files', async () => {
        generateCmakeConfigFiles(tree, options);
        const cmakeSettingsFiles = tree.children(
            `${options.cmakeConfigDir}/settings`,
        );
        const cmakeUtilsFiles = tree.children(
            `${options.cmakeConfigDir}/utils`,
        );
        expect(cmakeSettingsFiles).toStrictEqual(
            expect.arrayContaining(expectedCmakeSettingsFiles),
        );
        expect(cmakeUtilsFiles).toStrictEqual(
            expect.arrayContaining(expectedCmakeUtilsFiles),
        );
    });

    it('should generate cmake/modules.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/modules.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'include(FetchContent)\n' +
            'include(settings/set_global_settings)\n' +
            'include(settings/set_library_settings)\n' +
            'include(settings/set_binary_settings)\n' +
            'include(settings/set_policies)\n' +
            'include(utils/print_variables)\n' +
            'include(utils/link_shared_library)\n' +
            'include(utils/link_static_library)\n' +
            'include(utils/link_cmocka)\n' +
            'include(utils/link_gtest)\n' +
            'include(utils/install_cmocka)\n' +
            'include(utils/install_gtest)\n' +
            'include(utils/add_subdirectories)\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/__workspaceName__.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/${options.workspaceName}.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            `get_filename_component(ROOT "\${CMAKE_CURRENT_LIST_FILE}/../${options.relativeCmakeConfigPath}" REALPATH)\n` +
            `list(APPEND CMAKE_MODULE_PATH \${ROOT}/${options.cmakeConfigDir})\n` +
            `set(CMAKE_PREFIX_PATH \${ROOT}/config)\n` +
            '\n' +
            `include(modules)\n` +
            '\n' +
            'set_policies()\n' +
            'set_global_settings()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_binary_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/settings/set_binary_settings.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'include(settings/set_project_settings)\n' +
            '\n' +
            'function(set_binary_settings PROJECT SOURCE_DIR)\n' +
            '    add_executable(${PROJECT} ${${PROJECT}_SOURCES})\n' +
            '    set_target_properties(${PROJECT}\n' +
            '        PROPERTIES\n' +
            '        RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/${CMAKE_BUILD_TYPE}"\n' +
            '    )\n' +
            '    target_include_directories(${PROJECT} PUBLIC ${${PROJECT}_INCLUDE_DIR}/include ${WORKSPACE_INCLUDE_DIR})\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_compiler_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/settings/set_compiler_settings.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'function(set_c_flags)\n' +
            '    if (CMAKE_C_COMPILER_ID STREQUAL "GNU")\n' +
            '        string(CONCAT FLAGS\n' +
            '        " -Wall"\n' +
            '        " -Wextra"\n' +
            '        " -Wpedantic"\n' +
            '        " -fPIC"\n' +
            '        " -MMD"\n' +
            '        " -MP"\n' +
            '        )\n' +
            '        set(CMAKE_C_FLAGS ${FLAGS} CACHE INTERNAL "")\n' +
            '    else()\n' +
            '        message(FATAL_ERROR "Not using gcc, but only gcc is supported. compiler id: ${CMAKE_C_COMPILER_ID}")\n' +
            '        return()\n' +
            '    endif ()\n' +
            'endfunction()\n' +
            '\n' +
            'function(set_cxx_flags)\n' +
            '    if (CMAKE_CXX_COMPILER_ID STREQUAL "GNU")\n' +
            '        string(CONCAT FLAGS\n' +
            '        " -Wall"\n' +
            '        " -Wextra"\n' +
            '        " -Wpedantic"\n' +
            '        " -fPIC"\n' +
            '        " -MMD"\n' +
            '        " -MP"\n' +
            '        " -std=c++17"\n' +
            '        )\n' +
            '        set(CMAKE_CXX_FLAGS ${FLAGS} CACHE INTERNAL "")\n' +
            '    else()\n' +
            '        message(FATAL_ERROR "Not using gcc, but only gcc is supported. compiler id: ${CMAKE_CXX_COMPILER_ID}")\n' +
            '        return()\n' +
            '    endif ()\n' +
            'endfunction()\n' +
            '\n' +
            'function(set_compiler_settings)\n' +
            '    if(CMAKE_C_COMPILER_ID)\n' +
            '        set_c_flags()\n' +
            '    endif()\n' +
            '    if(CMAKE_CXX_COMPILER_ID)\n' +
            '        set_cxx_flags()\n' +
            '    endif()\n' +
            '    set(CMAKE_EXE_LINKER_FLAGS    "-Wl,--as-needed ${CMAKE_EXE_LINKER_FLAGS}")\n' +
            '    set(CMAKE_SHARED_LINKER_FLAGS "-Wl,--as-needed ${CMAKE_SHARED_LINKER_FLAGS}")\n' +
            'endfunction()\n' +
            '\n' +
            'if(DEFINED CUSTOM_C_FLAGS)\n' +
            '    set(CMAKE_CXX_FLAGS ${CUSTOM_C_FLAGS} CACHE STRING "" FORCE)\n' +
            'endif()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_global_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/settings/set_global_settings.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'function(set_global_settings)\n' +
            '    make_var_readonly(WORKSPACE_DIR ${CURRENT_DIR})\n' +
            '    make_var_readonly(WORKSPACE_INCLUDE_DIR ${WORKSPACE_DIR}/include)\n' +
            '    make_var_readonly(CMAKE_EXPORT_COMPILE_COMMANDS ON)\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_library_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/settings/set_library_settings.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'include(settings/set_project_settings)\n' +
            '\n' +
            'function(set_library_settings PROJECT SOURCE_DIR)\n' +
            '    add_library(${PROJECT} ${${PROJECT}_SOURCES})\n' +
            '    add_library(${PROJECT}::${PROJECT} ALIAS ${PROJECT})\n' +
            '    set_target_properties(${PROJECT} PROPERTIES PREFIX "")\n' +
            '    set_target_properties(${PROJECT}\n' +
            '        PROPERTIES\n' +
            '        ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/${CMAKE_BUILD_TYPE}/lib"\n' +
            '        LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/${CMAKE_BUILD_TYPE}/lib"\n' +
            '        RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/${CMAKE_BUILD_TYPE}/bin"\n' +
            '    )\n' +
            '    target_include_directories(${PROJECT} PUBLIC ${${PROJECT}_INCLUDE_DIR}/include ${WORKSPACE_INCLUDE_DIR})\n' +
            '    if(${CMAKE_SYSTEM_NAME} STREQUAL "Windows")\n' +
            '        set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS TRUE CACHE INTERNAL "")\n' +
            '        set(CMAKE_IMPORT_LIBRARY_PREFIX "" PARENT_SCOPE)\n' +
            '    endif()\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_project_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/settings/set_project_settings.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'include(settings/set_compiler_settings)\n' +
            '\n' +
            'function(set_project_settings PROJECT SOURCE_DIR)\n' +
            '    set(${PROJECT}_SOURCES_DIR ${SOURCE_DIR} CACHE INTERNAL "")\n' +
            '    set(${PROJECT}_INCLUDE_DIR ${SOURCE_DIR} CACHE INTERNAL "")\n' +
            '    file(GLOB_RECURSE INCLUDE_SOURCES ${${PROJECT}_INCLUDE_DIR}/**/*.h*)\n' +
            '    file(GLOB_RECURSE SOURCES ${${PROJECT}_SOURCES_DIR}/**/*.c*)\n' +
            '    set(${PROJECT}_SOURCES ${SOURCES} CACHE INTERNAL "")\n' +
            '    set(${PROJECT}_INCLUDE_SOURCES ${INCLUDE_SOURCES} CACHE INTERNAL "")\n' +
            '    set_compiler_settings()\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/subdirectories.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/subdirectories.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile = 'set(SUB_DIRECTORIES)\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/add_subdirectories.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/utils/add_subdirectories.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'include(subdirectories)\n' +
            '\n' +
            'macro(add_subdirectories)\n' +
            '    foreach(SUB_DIRECTORY ${SUB_DIRECTORIES})\n' +
            '        message("Adding subdirectory: ${SUB_DIRECTORY}")\n' +
            '        add_subdirectory(${SUB_DIRECTORY})\n' +
            '    endforeach()\n' +
            'endmacro()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/install_cmocka.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/utils/install_cmocka.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'function(install_cmocka)\n' +
            '    set(FETCHCONTENT_BASE_DIR ${CMAKE_LIBRARY_PATH}/cmocka)\n' +
            '\n' +
            '    FetchContent_Declare(\n' +
            '        cmocka\n' +
            '        GIT_REPOSITORY https://git.cryptomilk.org/projects/cmocka.git\n' +
            '        GIT_TAG        cmocka-1.1.5\n' +
            '        GIT_SHALLOW    1\n' +
            '        FIND_PACKAGE_ARGS NAMES cmocka\n' +
            '    )\n' +
            '\n' +
            '    set(WITH_STATIC_LIB ON CACHE BOOL "CMocka: Build with a static library" FORCE)\n' +
            '    set(WITH_CMOCKERY_SUPPORT OFF CACHE BOOL "CMocka: Install a cmockery header" FORCE)\n' +
            '    set(WITH_EXAMPLES OFF CACHE BOOL "CMocka: Build examples" FORCE)\n' +
            '    set(UNIT_TESTING OFF CACHE BOOL "CMocka: Build with unit testing" FORCE)\n' +
            '    set(PICKY_DEVELOPER OFF CACHE BOOL "CMocka: Build with picky developer flags" FORCE)\n' +
            '\n' +
            '    FetchContent_MakeAvailable(cmocka)\n' +
            '    find_package(cmocka REQUIRED)\n' +
            'endfunction(install_cmocka)\n' +
            '\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/install_gtest.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/utils/install_gtest.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'function(install_gtest)\n' +
            '    set(FETCHCONTENT_BASE_DIR ${CMAKE_LIBRARY_PATH}/gtest)\n' +
            '\n' +
            '    FetchContent_Declare(\n' +
            '        googletest\n' +
            '        GIT_REPOSITORY https://github.com/google/googletest\n' +
            '        GIT_TAG        v1.13.0\n' +
            '        GIT_SHALLOW    1\n' +
            '        OVERRIDE_FIND_PACKAGE\n' +
            '    )\n' +
            '\n' +
            '    set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)\n' +
            '    find_package(googletest REQUIRED)\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/link_cmocka.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/utils/link_cmocka.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'include(utils/install_cmocka)\n' +
            '\n' +
            'function(link_cmocka PROJECT)\n' +
            '    install_cmocka()\n' +
            '    target_include_directories(${PROJECT} PUBLIC ${cmocka_SOURCE_DIR}/include)\n' +
            '    if(${CMAKE_SYSTEM_NAME} MATCHES "Darwin")\n' +
            '        target_link_libraries(${PROJECT} PUBLIC cmocka-static -Wl,-export_dynamic)\n' +
            '    else()\n' +
            '        target_link_libraries(${PROJECT} PUBLIC cmocka-static -Wl,--copy-dt-needed-entries)\n' +
            '    endif()\n' +
            '    add_test(UnitTests ${PROJECT})\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/link_gtest.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/utils/link_gtest.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'include(utils/install_gtest)\n' +
            '\n' +
            'function(link_gtest PROJECT)\n' +
            '    install_gtest()\n' +
            '    target_include_directories(${PROJECT} PUBLIC ${googletest_SOURCE_DIR}/googletest/include/gtest)\n' +
            '    if(${CMAKE_SYSTEM_NAME} MATCHES "Darwin")\n' +
            '        target_link_libraries(${PROJECT} PUBLIC GTest::gtest_main -Wl,-export_dynamic)\n' +
            '    else()\n' +
            '        target_link_libraries(${PROJECT} PUBLIC GTest::gtest_main -Wl,--copy-dt-needed-entries)\n' +
            '    endif()\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/link_shared_library.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/utils/link_shared_library.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'function(link_shared_library PROJECT LIB)\n' +
            '    set(PREFIX "lib")\n' +
            '    set(LIB_WITH_PREFIX ${PREFIX}${LIB})\n' +
            '    add_library(${LIB_WITH_PREFIX} SHARED IMPORTED)\n' +
            '    if(${CMAKE_SYSTEM_NAME} STREQUAL "Windows")\n' +
            '        set_target_properties(${LIB_WITH_PREFIX} PROPERTIES IMPORTED_LOCATION ${CMAKE_LIBRARY_PATH}/${LIB}/${CMAKE_BUILD_TYPE}/bin/${LIB_WITH_PREFIX}.dll)\n' +
            '        set_target_properties(${LIB_WITH_PREFIX} PROPERTIES IMPORTED_IMPLIB ${CMAKE_LIBRARY_PATH}/${LIB}/${CMAKE_BUILD_TYPE}/lib/${LIB_WITH_PREFIX}.dll.a)\n' +
            '    elseif(${CMAKE_SYSTEM_NAME} STREQUAL "Darwin")\n' +
            '        set_target_properties(${LIB_WITH_PREFIX} PROPERTIES IMPORTED_LOCATION ${CMAKE_LIBRARY_PATH}/${LIB}/${CMAKE_BUILD_TYPE}/lib/${LIB_WITH_PREFIX}.dylib)\n' +
            '    else()\n' +
            '        set_target_properties(${LIB_WITH_PREFIX} PROPERTIES IMPORTED_LOCATION ${CMAKE_LIBRARY_PATH}/${LIB}/${CMAKE_BUILD_TYPE}/lib/${LIB_WITH_PREFIX}.so)\n' +
            '    endif()\n' +
            '    target_link_libraries(${PROJECT} ${LIB_WITH_PREFIX})\n' +
            '    set(LIB_DIR ${WORKSPACE_LIBRARY_DIR}/${LIB})\n' +
            '    target_include_directories(${PROJECT} PRIVATE ${LIB_DIR})\n' +
            '    target_include_directories(${PROJECT} PRIVATE ${LIB_DIR}/include)\n' +
            '    target_include_directories(${PROJECT} PRIVATE ${LIB_DIR}/src)\n' +
            '    if(${CMAKE_SYSTEM_NAME} STREQUAL "Darwin")\n' +
            '        target_link_options(${PROJECT} PRIVATE "-Wl,-undefined,dynamic_lookup" "-Wl,-dead_strip")\n' +
            '    else()\n' +
            '        target_link_options(${PROJECT} PRIVATE "-Wl,--as-needed")\n' +
            '    endif()\n' +
            '    add_custom_command(TARGET ${PROJECT} POST_BUILD\n' +
            '        COMMAND ${CMAKE_COMMAND} -E copy -t $<TARGET_FILE_DIR:${PROJECT}> $<TARGET_RUNTIME_DLLS:${PROJECT}>\n' +
            '        COMMAND_EXPAND_LISTS\n' +
            '    )\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/link_static_library.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/utils/link_static_library.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'function(link_static_library PROJECT LIB)\n' +
            '    set(PREFIX "lib")\n' +
            '    set(LIB_WITH_PREFIX ${PREFIX}${LIB})\n' +
            '    set(LIB_DIR ${WORKSPACE_LIBRARY_DIR}/${LIB})\n' +
            '    target_link_libraries(${PROJECT} PUBLIC ${LIB_WITH_PREFIX}::${LIB_WITH_PREFIX})\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/print_variables.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = `${options.cmakeConfigDir}/utils/print_variables.cmake`;
        const readFile = readFileWithTree(tree, file);
        const expectedFile =
            'function(print_variables)\n' +
            '    get_cmake_property(_variableNames VARIABLES)\n' +
            '    list(SORT _variableNames)\n' +
            '    foreach(_variableName ${_variableNames})\n' +
            '        message(STATUS "${_variableName} = ${${_variableName}}")\n' +
            '    endforeach()\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });
});
