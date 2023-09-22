import { getBaseTest } from './getBaseTest';

describe('getBaseTest', () => {
    it('should return an empty string when generateTests is false', () => {
        const generateTests = false;
        const language = 'C++';
        const libName = 'MyLib';
        const projectName = 'MyProject';
        const result = getBaseTest(
            generateTests,
            language,
            libName,
            projectName
        );
        expect(result).toBe('');
    });

    it('should return baseGtest when generateTests is true and language is C++', () => {
        const generateTests = true;
        const language = 'C++';
        const libName = 'libgui';
        const projectName = 'gui';
        const expected =
            'TEST(libgui, test_gui) {\n\tEXPECT_EQ(gui(), 0);\n}\n';
        const result = getBaseTest(
            generateTests,
            language,
            libName,
            projectName
        );
        expect(result).toBe(expected);
    });

    it('should return baseCmocka when generateTests is true and language is not C++', () => {
        const generateTests = true;
        const language = 'C';
        const libName = 'libparser';
        const projectName = 'parser';
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
        const result = getBaseTest(
            generateTests,
            language,
            libName,
            projectName
        );
        expect(result).toBe(expected);
    });
});
