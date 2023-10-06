import { snakeCaseToCamelCase } from '@/utils';

export const getBaseCmockaTest = (projectName: string) => {
    const snakeCaseProjectName = projectName.replace(/-/g, '_');
    const camelCaseProjectName = snakeCaseToCamelCase(snakeCaseProjectName);

    return (
        `static int setup(void **state) {\n` +
        `\t(void) state;\n` +
        `\treturn 0;\n}\n\n` +
        `static int teardown(void **state) {\n` +
        `\t(void) state;\n` +
        `\treturn 0;\n}\n\n` +
        `static void test_${snakeCaseProjectName}(void **state) {\n` +
        `\t(void) state;\n` +
        `\t${camelCaseProjectName}();\n}\n\n` +
        `int main(void) {\n` +
        `\tconst struct CMUnitTest ${snakeCaseProjectName}_tests[] = {\n` +
        `\t\tcmocka_unit_test(test_${snakeCaseProjectName}),\n\t};\n` +
        `\treturn cmocka_run_group_tests(${snakeCaseProjectName}_tests, setup, teardown);\n}\n`
    );
};
