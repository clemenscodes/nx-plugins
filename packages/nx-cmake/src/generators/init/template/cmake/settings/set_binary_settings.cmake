include(settings/set_project_settings)

function(set_binary_settings PROJECT SOURCE_DIR)
    set_project_settings(${PROJECT} ${SOURCE_DIR})
    add_executable(${PROJECT} ${${PROJECT}_SOURCES})
    target_include_directories(${PROJECT} PRIVATE ${${PROJECT}_INCLUDE_DIR} ${WORKSPACE_INCLUDE_DIR})
endfunction()
