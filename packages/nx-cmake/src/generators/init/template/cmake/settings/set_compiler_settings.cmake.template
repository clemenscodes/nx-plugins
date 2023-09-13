function(set_c_flags)
    if (CMAKE_C_COMPILER_ID MATCHES "Clang" OR CMAKE_C_COMPILER_ID STREQUAL "GNU")
        string(CONCAT FLAGS
        " -Wall"
        " -Wextra"
        " -Wpedantic"
        " -fPIC"
        " -MMD"
        " -MP"
        )
        set(CMAKE_C_FLAGS ${FLAGS} CACHE INTERNAL "")
    elseif (CMAKE_C_COMPILER_ID STREQUAL "MSVC")
        string(CONCAT FLAGS
        " /W4"
        )
        set(CMAKE_C_FLAGS ${FLAGS} CACHE INTERNAL "")
    endif ()
endfunction()

function(set_cxx_flags)
    if (CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
        string(CONCAT FLAGS
        " -Wall"
        " -Wextra"
        " -Wpedantic"
        " -fPIC"
        " -MMD"
        " -MP"
        " -std=c++17"
        )
        set(CMAKE_CXX_FLAGS ${FLAGS} CACHE INTERNAL "")
    elseif (CMAKE_CXX_COMPILER_ID STREQUAL "MSVC")
        string(CONCAT FLAGS
        " /W4"
        " /std:c++17"
        )
        set(CMAKE_CXX_FLAGS ${FLAGS} CACHE INTERNAL "")
    endif ()
endfunction()

function(set_compiler_settings)
    set_c_flags()
    set_cxx_flags()
    set(CMAKE_EXE_LINKER_FLAGS    "-Wl,--as-needed ${CMAKE_EXE_LINKER_FLAGS}")
    set(CMAKE_SHARED_LINKER_FLAGS "-Wl,--as-needed ${CMAKE_SHARED_LINKER_FLAGS}")
endfunction()

if(DEFINED CUSTOM_C_FLAGS)
    set(CMAKE_CXX_FLAGS ${CUSTOM_C_FLAGS} CACHE STRING "" FORCE)
endif()
