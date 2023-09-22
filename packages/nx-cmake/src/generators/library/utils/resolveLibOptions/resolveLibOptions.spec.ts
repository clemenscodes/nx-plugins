import type { LibGeneratorSchema, LibOptions } from '../../schema';
import { resolveLibOptions } from './resolveLibOptions';

describe('resolveLibOptions', () => {
    let options: LibGeneratorSchema;
    let expectedOptions: LibOptions;

    beforeEach(() => {
        options = {
            name: 'base',
            language: 'C',
            generateTests: false,
        };
        expectedOptions = {
            ...options,
            constantName: 'BASE',
            snakeCaseName: 'base',
            languageExtension: 'c',
            relativeRootPath: '../../',
            cmakeC: 'C',
            includeGoogleTest: '',
            setupTests: '',
            baseTest: '',
            testLib: 'cmocka',
            testName: 'testbase',
            libName: 'libbase',
            projectRoot: 'packages/base',
        };
    });

    it('should resolve options correctly when generateTests is false and language is C', () => {
        const result = resolveLibOptions(options);
        expect(result).toStrictEqual(expectedOptions);
    });

    it('should resolve options correctly when generateTests is true and language is C', () => {
        options.generateTests = true;
        expectedOptions.generateTests = true;
        expectedOptions.setupTests = 'add_test(UnitTests testbase)';
        expectedOptions.baseTest =
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
            'static void test_base(void **state) {\n' +
            '\t(void) state;\n' +
            '\tbase();\n' +
            '}\n' +
            '\n' +
            'int main(void) {\n' +
            '\tconst struct CMUnitTest base_tests[] = {\n' +
            '\t\tcmocka_unit_test(test_base),\n' +
            '\t};\n' +
            '\treturn cmocka_run_group_tests(base_tests, setup, teardown);\n' +
            '}\n';
        const result = resolveLibOptions(options);
        expect(result).toStrictEqual(expectedOptions);
    });

    it('should resolve options correctly when generateTests is false and language is C++', () => {
        options.language = 'C++';
        expectedOptions.language = 'C++';
        expectedOptions.languageExtension = 'cpp';
        expectedOptions.cmakeC = 'CXX';
        expectedOptions.testLib = 'gtest';
        const result = resolveLibOptions(options);
        expect(result).toStrictEqual(expectedOptions);
    });

    it('should resolve options correctly when generateTests is true and language is C++', () => {
        options.language = 'C++';
        options.generateTests = true;
        expectedOptions.language = 'C++';
        expectedOptions.generateTests = true;
        expectedOptions.languageExtension = 'cpp';
        expectedOptions.cmakeC = 'CXX';
        expectedOptions.testLib = 'gtest';
        expectedOptions.includeGoogleTest = 'include(GoogleTest)';
        expectedOptions.setupTests = 'gtest_discover_tests(testbase)';
        expectedOptions.baseTest =
            'TEST(libbase, test_base) {\n\tEXPECT_EQ(base(), 0);\n}\n';
        const result = resolveLibOptions(options);
        expect(result).toStrictEqual(expectedOptions);
    });
});
