include("../../CMakeLists.txt")

cmake_minimum_required(VERSION ${CMAKE_MINIMUM_REQUIRED_VERSION})
set_project_settings(buggy ${CMAKE_CURRENT_SOURCE_DIR})
project(buggy CXX)
set_binary_settings(buggy ${CMAKE_CURRENT_SOURCE_DIR})
link_shared_library(${CMAKE_PROJECT_NAME} buggy)
