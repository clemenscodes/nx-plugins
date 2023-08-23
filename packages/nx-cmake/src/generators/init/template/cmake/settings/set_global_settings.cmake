include(settings/set_compiler)

function(set_global_settings)
    set(CMAKE_MINIMUM_REQUIRED_VERSION 3.16.3 CACHE INTERNAL "")
    set(CMAKE_CXX_STANDARD 17 CACHE INTERNAL "")
    set(CMAKE_CXX_EXTENSIONS OFF CACHE INTERNAL "")
    set(CMAKE_CXX_STANDARD_REQUIRED ON CACHE INTERNAL "")
    set(CMAKE_CXX_STANDARD_LIBRARIES "-lstdc++" CACHE INTERNAL "")

    if (NOT CMAKE_BUILD_TYPE)
        set(CMAKE_BUILD_TYPE Debug CACHE INTERNAL "")
    endif ()

    set_compiler()
endfunction()
