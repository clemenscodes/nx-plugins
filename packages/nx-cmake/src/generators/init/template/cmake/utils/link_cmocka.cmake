include(utils/install_cmocka)

function(link_cmocka PROJECT)
    install_cmocka()
    target_link_libraries(${PROJECT} PRIVATE cmocka-static)
    add_test(UnitTests ${PROJECT})
endfunction()
