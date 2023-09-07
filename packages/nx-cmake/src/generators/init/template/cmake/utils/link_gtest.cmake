include(utils/install_gtest)

function(link_gtest PROJECT)
    install_gtest()
    target_link_libraries(${PROJECT} GTest::gtest_main -Wl,--copy-dt-needed-entries)
endfunction()
