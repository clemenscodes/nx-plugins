import { resolveLibOptions } from './resolveLibOptions';
import { LibGeneratorSchema } from '../../schema';

describe('resolveLibOptions', () => {
    it('should resolve options correctly when generateTests is false and language is C', () => {
        const baseOptions: LibGeneratorSchema = {
            name: 'base',
            language: 'C',
            skipFormat: false,
            generateTests: false,
        };

        const expected = {
            ...baseOptions,
            constantName: 'BASE',
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

        const result = resolveLibOptions(baseOptions);
        expect(result).toStrictEqual(expected);
    });

    it('should resolve options correctly when generateTests is true and language is C', () => {
        const baseOptions: LibGeneratorSchema = {
            name: 'base',
            language: 'C',
            skipFormat: false,
            generateTests: true,
        };

        const expected = {
            ...baseOptions,
            constantName: 'BASE',
            languageExtension: 'c',
            relativeRootPath: '../../',
            cmakeC: 'C',
            includeGoogleTest: '',
            setupTests: 'add_test(UnitTests testbase)',
            baseTest:
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
                '}\n',
            testLib: 'cmocka',
            testName: 'testbase',
            libName: 'libbase',
            projectRoot: 'packages/base',
        };

        const result = resolveLibOptions(baseOptions);
        expect(result).toStrictEqual(expected);
    });

    it('should resolve options correctly when generateTests is false and language is C++', () => {
        const baseOptions: LibGeneratorSchema = {
            name: 'base',
            language: 'C++',
            skipFormat: false,
            generateTests: false,
        };

        const expected = {
            ...baseOptions,
            constantName: 'BASE',
            languageExtension: 'cpp',
            relativeRootPath: '../../',
            cmakeC: 'CXX',
            includeGoogleTest: '',
            setupTests: '',
            baseTest: '',
            testLib: 'gtest',
            testName: 'testbase',
            libName: 'libbase',
            projectRoot: 'packages/base',
        };

        const result = resolveLibOptions(baseOptions);
        expect(result).toStrictEqual(expected);
    });

    it('should resolve options correctly when generateTests is true and language is C++', () => {
        const baseOptions: LibGeneratorSchema = {
            name: 'base',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };

        const expected = {
            name: 'base',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
            constantName: 'BASE',
            languageExtension: 'cpp',
            relativeRootPath: '../../',
            cmakeC: 'CXX',
            includeGoogleTest: 'include(GoogleTest)',
            setupTests: 'gtest_discover_tests(testbase)',
            baseTest:
                'TEST(libbase, test_base) {\n\tEXPECT_EQ(base(), 0);\n}\n',
            testLib: 'gtest',
            testName: 'testbase',
            libName: 'libbase',
            projectRoot: 'packages/base',
        };

        const result = resolveLibOptions(baseOptions);
        expect(result).toStrictEqual(expected);
    });
});
