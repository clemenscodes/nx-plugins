include(utils/install_gtest)

function(link_gtest PROJECT)
    install_gtest()
    include(GoogleTest)
    target_link_libraries(${PROJECT} PRIVATE GTest::gtest_main)
endfunction()
