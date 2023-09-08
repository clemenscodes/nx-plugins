include(utils/install_cmocka)

function(link_cmocka PROJECT)
    install_cmocka()
    include_directories(${cmocka_SOURCE_DIR}/include)
    target_link_libraries(${PROJECT} cmocka-static -Wl,--copy-dt-needed-entries)
    add_test(UnitTests ${PROJECT})
endfunction()
