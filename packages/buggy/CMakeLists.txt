include("../../CMakeLists.txt")

cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})
set_project_settings(libbuggy ${CMAKE_CURRENT_SOURCE_DIR})
project(libbuggy CXX)
set_library_settings(libbuggy ${CMAKE_CURRENT_SOURCE_DIR})
