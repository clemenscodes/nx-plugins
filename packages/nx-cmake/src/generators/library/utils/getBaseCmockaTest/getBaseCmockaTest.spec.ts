import { getBaseCmockaTest } from './getBaseCmockaTest';

describe('getBaseCmockaTest', () => {
    let projectName: string;

    beforeEach(() => {
        projectName = 'nx-cmake-test-c';
    });

    it('should generate test code with the project name', () => {
        const result = getBaseCmockaTest(projectName);

        expect(result).toContain(
            `static void test_nx_cmake_test_c(void **state)`
        );
        expect(result).toContain(`nx_cmake_test_c();`);
    });

    it('should generate test code with setup and teardown functions', () => {
        const result = getBaseCmockaTest(projectName);

        expect(result).toContain(`static int setup(void **state)`);
        expect(result).toContain(`static int teardown(void **state)`);
    });

    it('should generate test code with cmocka_unit_test and cmocka_run_group_tests', () => {
        const result = getBaseCmockaTest(projectName);

        expect(result).toContain(`cmocka_unit_test(test_nx_cmake_test_c)`);
        expect(result).toContain(
            `cmocka_run_group_tests(nx_cmake_test_c_tests, setup, teardown)`
        );
    });

    it('should generate full test code with the project name', () => {
        projectName = 'parser';
        const result = getBaseCmockaTest(projectName);
        const expected =
            'static int setup(void **state) {\n' +
            '\t(void) state;\n' +
            '\treturn 0;\n' +
            '}\n' +
            '\n' +
            'static int teardown(void **state) {\n' +
            '\t(void) state;\n' +
            '\treturn 0;\n' +
            '}\n' +
            '\n' +
            'static void test_parser(void **state) {\n' +
            '\t(void) state;\n' +
            '\tparser();\n' +
            '}\n' +
            '\n' +
            'int main(void) {\n' +
            '\tconst struct CMUnitTest parser_tests[] = {\n' +
            '\t\tcmocka_unit_test(test_parser),\n' +
            '\t};\n' +
            '\treturn cmocka_run_group_tests(parser_tests, setup, teardown);\n' +
            '}\n';
        expect(result).toEqual(expected);
    });
});
