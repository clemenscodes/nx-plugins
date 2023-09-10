export const getBaseCmockaTest = (projectName: string) => {
    return (
        `static int setup(void **state) {\n` +
        `\t(void) state;\n` +
        `\treturn 0;\n}\n\n` +
        `static int teardown(void **state) {\n` +
        `\t(void) state;\n` +
        `\treturn 0;\n}\n\n` +
        `static void test_${projectName}(void **state) {\n` +
        `\t(void) state;\n` +
        `\t${projectName}();\n}\n\n` +
        `int main(void) {\n` +
        `\tconst struct CMUnitTest ${projectName}_tests[] = {\n` +
        `\t\tcmocka_unit_test(test_${projectName}),\n\t};\n` +
        `\treturn cmocka_run_group_tests(${projectName}_tests, setup, teardown);\n}\n`
    );
};
