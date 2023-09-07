include(utils/install_cmocka)

function(link_cmocka PROJECT)
    install_cmocka()
    target_link_libraries(${PROJECT} cmocka-static -Wl,--copy-dt-needed-entries)
    add_test(UnitTests ${PROJECT})
endfunction()
