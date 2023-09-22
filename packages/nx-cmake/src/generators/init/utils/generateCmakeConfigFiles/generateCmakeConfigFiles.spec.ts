import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateCmakeConfigFiles } from './generateCmakeConfigFiles';

describe('generateCmakeConfigFiles', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let expectedCmakeSettingsFiles: string[];
    let expectedCmakeUtilsFiles: string[];

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'derived',
            cmakeConfigDir: 'cmake',
            addClangPreset: false,
        };
        expectedCmakeSettingsFiles = [
            'set_binary_settings.cmake',
            'set_compiler.cmake',
            'set_compiler_settings.cmake',
            'set_global_settings.cmake',
            'set_library_settings.cmake',
            'set_project_settings.cmake',
        ];
        expectedCmakeUtilsFiles = [
            'install_cmocka.cmake',
            'install_gtest.cmake',
            'link_cmocka.cmake',
            'link_gtest.cmake',
            'link_shared_library.cmake',
            'link_static_library.cmake',
            'make_var_readonly.cmake',
            'print_variables.cmake',
        ];
    });

    it('should generate cmake config in cmake', async () => {
        generateCmakeConfigFiles(tree, options);
        const cmakeChildren = tree.children('cmake');
        const expectedCmakeChildren = ['settings', 'utils'];
        expect(cmakeChildren).toStrictEqual(expectedCmakeChildren);
    });

    it('should generate cmake config in .cmake', async () => {
        options.cmakeConfigDir = '.cmake';
        generateCmakeConfigFiles(tree, options);
        const cmakeChildren = tree.children('.cmake');
        const expectedCmakeChildren = ['settings', 'utils'];
        expect(cmakeChildren).toStrictEqual(expectedCmakeChildren);
    });

    it('should generate cmake config files', async () => {
        generateCmakeConfigFiles(tree, options);
        const cmakeSettingsFiles = tree.children('cmake/settings');
        const cmakeUtilsFiles = tree.children('cmake/utils');
        expect(cmakeSettingsFiles).toStrictEqual(expectedCmakeSettingsFiles);
        expect(cmakeUtilsFiles).toStrictEqual(expectedCmakeUtilsFiles);
    });

    it('should generate cmake/settings/set_binary_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/settings/set_binary_settings.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'include(settings/set_project_settings)\n' +
            '\n' +
            'function(set_binary_settings PROJECT SOURCE_DIR)\n' +
            '    set_project_settings(${PROJECT} ${SOURCE_DIR})\n' +
            '    add_executable(${PROJECT} ${${PROJECT}_SOURCES})\n' +
            '    target_include_directories(${PROJECT} PRIVATE ${${PROJECT}_INCLUDE_DIR} ${WORKSPACE_INCLUDE_DIR})\n' +
            '    target_include_directories(${PROJECT} PRIVATE ${${PROJECT}_INCLUDE_DIR}/include ${WORKSPACE_INCLUDE_DIR})\n' +
            '    target_include_directories(${PROJECT} PRIVATE ${${PROJECT}_INCLUDE_DIR}/src ${WORKSPACE_INCLUDE_DIR})\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_compiler_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/settings/set_compiler_settings.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'function(set_c_flags)\n' +
            '    if (CMAKE_C_COMPILER_ID MATCHES "Clang" OR CMAKE_C_COMPILER_ID STREQUAL "GNU")\n' +
            '        string(CONCAT FLAGS\n' +
            '        " -Wall"\n' +
            '        " -Wextra"\n' +
            '        " -Wpedantic"\n' +
            '        " -fPIC"\n' +
            '        " -MMD"\n' +
            '        " -MP"\n' +
            '        )\n' +
            '        set(CMAKE_C_FLAGS ${FLAGS} CACHE INTERNAL "")\n' +
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
            '    endif ()\n' +
            'endfunction()\n' +
            '\n' +
            'function(set_compiler_settings)\n' +
            '    set_c_flags()\n' +
            '    set_cxx_flags()\n' +
            '    set(CMAKE_EXE_LINKER_FLAGS    "-Wl,--as-needed ${CMAKE_EXE_LINKER_FLAGS}")\n' +
            '    set(CMAKE_SHARED_LINKER_FLAGS "-Wl,--as-needed ${CMAKE_SHARED_LINKER_FLAGS}")\n' +
            'endfunction()\n' +
            '\n' +
            'if(DEFINED CUSTOM_C_FLAGS)\n' +
            '    set(CMAKE_CXX_FLAGS ${CUSTOM_C_FLAGS} CACHE STRING "" FORCE)\n' +
            'endif()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_compiler.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/settings/set_compiler.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'function(set_compiler)\n' +
            '    if (UNIX)\n' +
            '        set(CMAKE_C_COMPILER gcc CACHE INTERNAL "")\n' +
            '        set(CMAKE_CXX_COMPILER ${CMAKE_C_COMPILER} CACHE INTERNAL "")\n' +
            '    else()\n' +
            '        message(FATAL_ERROR "Unsupported platform. Please set the compiler manually.")\n' +
            '    endif ()\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_global_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/settings/set_global_settings.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'include(settings/set_compiler)\n' +
            '\n' +
            'function(set_global_settings)\n' +
            '    set(CMAKE_MINIMUM_REQUIRED_VERSION 3.16.3 CACHE INTERNAL "")\n' +
            '    set(CMAKE_EXPORT_COMPILE_COMMANDS ON CACHE INTERNAL "")\n' +
            '    set(CMAKE_CXX_STANDARD 17 CACHE INTERNAL "")\n' +
            '    set(CMAKE_CXX_EXTENSIONS OFF CACHE INTERNAL "")\n' +
            '    set(CMAKE_CXX_STANDARD_REQUIRED ON CACHE INTERNAL "")\n' +
            '    set(CMAKE_CXX_STANDARD_LIBRARIES "-lstdc++" CACHE INTERNAL "")\n' +
            '\n' +
            '    if (NOT CMAKE_BUILD_TYPE)\n' +
            '        set(CMAKE_BUILD_TYPE Debug CACHE INTERNAL "")\n' +
            '    endif ()\n' +
            '\n' +
            '    set_compiler()\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_library_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/settings/set_library_settings.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'include(settings/set_project_settings)\n' +
            '\n' +
            'function(set_library_settings PROJECT SOURCE_DIR)\n' +
            '    set_project_settings(${PROJECT} ${SOURCE_DIR})\n' +
            '    add_library(${PROJECT} SHARED ${${PROJECT}_SOURCES})\n' +
            '    add_library(${PROJECT}_static STATIC ${${PROJECT}_SOURCES})\n' +
            '    set_target_properties(${PROJECT} ${PROJECT}_static PROPERTIES PREFIX "")\n' +
            '    set_target_properties(${PROJECT}_static PROPERTIES OUTPUT_NAME ${PROJECT})\n' +
            '    target_include_directories(${PROJECT} PUBLIC ${${PROJECT}_INCLUDE_DIR} ${WORKSPACE_INCLUDE_DIR})\n' +
            '    target_include_directories(${PROJECT}_static PUBLIC ${${PROJECT}_INCLUDE_DIR} ${WORKSPACE_INCLUDE_DIR})\n' +
            '    target_include_directories(${PROJECT} PUBLIC ${${PROJECT}_INCLUDE_DIR}/include ${WORKSPACE_INCLUDE_DIR})\n' +
            '    target_include_directories(${PROJECT}_static PUBLIC ${${PROJECT}_INCLUDE_DIR}/include ${WORKSPACE_INCLUDE_DIR})\n' +
            '    target_include_directories(${PROJECT} PUBLIC ${${PROJECT}_INCLUDE_DIR}/src ${WORKSPACE_INCLUDE_DIR})\n' +
            '    target_include_directories(${PROJECT}_static PUBLIC ${${PROJECT}_INCLUDE_DIR}/src ${WORKSPACE_INCLUDE_DIR})\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/settings/set_project_settings.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/settings/set_project_settings.cmake';
        const readFile = tree.read(file, 'utf-8');
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

    it('should generate cmake/utils/install_cmocka.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/utils/install_cmocka.cmake';
        const readFile = tree.read(file, 'utf-8');
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
        const file = 'cmake/utils/install_gtest.cmake';
        const readFile = tree.read(file, 'utf-8');
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
        const file = 'cmake/utils/link_cmocka.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'include(utils/install_cmocka)\n' +
            '\n' +
            'function(link_cmocka PROJECT)\n' +
            '    install_cmocka()\n' +
            '    include_directories(${cmocka_SOURCE_DIR}/include)\n' +
            '    target_link_libraries(${PROJECT} cmocka-static -Wl,--copy-dt-needed-entries)\n' +
            '    add_test(UnitTests ${PROJECT})\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/link_gtest.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/utils/link_gtest.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'include(utils/install_gtest)\n' +
            '\n' +
            'function(link_gtest PROJECT)\n' +
            '    install_gtest()\n' +
            '    include_directories(${googletest_SOURCE_DIR}/googletest/include/gtest)\n' +
            '    target_link_libraries(${PROJECT} GTest::gtest_main -Wl,--copy-dt-needed-entries)\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/link_shared_library.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/utils/link_shared_library.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'function(link_shared_library PROJECT LIB)\n' +
            '    set(PREFIX "lib")\n' +
            '    set(LIB_WITH_PREFIX ${PREFIX}${LIB})\n' +
            '    add_library(${LIB_WITH_PREFIX} SHARED IMPORTED)\n' +
            '    if (UNIX)\n' +
            '        set_target_properties(${LIB_WITH_PREFIX} PROPERTIES IMPORTED_LOCATION ${CMAKE_LIBRARY_PATH}/${LIB}/${LIB_WITH_PREFIX}.so)\n' +
            '    else()\n' +
            '        message(FATAL_ERROR "Unsupported platform. Please link the library manually.")\n' +
            '        return()\n' +
            '    endif()\n' +
            '    target_link_libraries(${PROJECT} ${LIB_WITH_PREFIX})\n' +
            '    set(LIB_INCLUDE_DIR ${WORKSPACE_LIBRARY_DIR}/${LIB}/include)\n' +
            '    target_include_directories(${PROJECT} PRIVATE ${LIB_INCLUDE_DIR})\n' +
            '    target_link_options(${PROJECT} PRIVATE "-Wl,--as-needed")\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/link_static_library.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/utils/link_static_library.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'function(link_static_library PROJECT LIB)\n' +
            '    set(PREFIX "lib")\n' +
            '    set(LIB_WITH_PREFIX ${PREFIX}${LIB})\n' +
            '    add_library(${LIB_WITH_PREFIX} STATIC IMPORTED)\n' +
            '    if (UNIX)\n' +
            '        set_target_properties(${LIB_WITH_PREFIX} PROPERTIES IMPORTED_LOCATION ${CMAKE_LIBRARY_PATH}/${LIB}/${LIB_WITH_PREFIX}.a)\n' +
            '    else()\n' +
            '        message(FATAL_ERROR "Unsupported platform. Please link the library manually.")\n' +
            '        return()\n' +
            '    endif()\n' +
            '    target_link_libraries(${PROJECT} ${LIB_WITH_PREFIX})\n' +
            '    set(LIB_INCLUDE_DIR ${WORKSPACE_LIBRARY_DIR}/${LIB}/include)\n' +
            '    target_include_directories(${PROJECT} PRIVATE ${LIB_INCLUDE_DIR})\n' +
            'endfunction()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/make_var_readonly.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/utils/make_var_readonly.cmake';
        const readFile = tree.read(file, 'utf-8');
        const expectedFile =
            'macro(make_var_readonly VAR)\n' +
            '  # Set the variable itself\n' +
            '  set("${VAR}" "${ARGN}")\n' +
            "  # Store the variable's value for restore it upon modifications.\n" +
            '  set("_${VAR}_readonly_val")\n' +
            '  # Register a watcher for a variable\n' +
            '  variable_watch("${VAR}" readonly_guard)\n' +
            'endmacro()\n' +
            '\n' +
            '# Watcher for a variable which emulates readonly property.\n' +
            'macro(readonly_guard VAR access value current_list_file stack)\n' +
            '  if ("${access}" STREQUAL "MODIFIED_ACCESS")\n' +
            '    message(WARNING "Attempt to change readonly variable \'${VAR}\'!")\n' +
            '    # Restore a value of the variable to the initial one.\n' +
            '    set(${VAR} "${_${VAR}_readonly_val}")\n' +
            '  endif()\n' +
            'endmacro()\n';
        expect(readFile).toStrictEqual(expectedFile);
    });

    it('should generate cmake/utils/print_variables.cmake correctly', async () => {
        generateCmakeConfigFiles(tree, options);
        const file = 'cmake/utils/print_variables.cmake';
        const readFile = tree.read(file, 'utf-8');
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
