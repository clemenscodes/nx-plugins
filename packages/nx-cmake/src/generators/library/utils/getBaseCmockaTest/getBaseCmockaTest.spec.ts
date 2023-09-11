import { readFileSync } from 'fs';
import { join } from 'path';
import { getBaseCmockaTest } from './getBaseCmockaTest';

describe('getBaseCmockaTest', () => {
    it('should generate test code with the project name', () => {
        const projectName = 'MyProject';
        const result = getBaseCmockaTest(projectName);

        expect(result).toContain(
            `static void test_${projectName}(void **state)`
        );
        expect(result).toContain(`${projectName}();`);
    });

    it('should generate test code with setup and teardown functions', () => {
        const projectName = 'MyProject';
        const result = getBaseCmockaTest(projectName);

        expect(result).toContain(`static int setup(void **state)`);
        expect(result).toContain(`static int teardown(void **state)`);
    });

    it('should generate test code with cmocka_unit_test and cmocka_run_group_tests', () => {
        const projectName = 'MyProject';
        const result = getBaseCmockaTest(projectName);

        expect(result).toContain(`cmocka_unit_test(test_${projectName})`);
        expect(result).toContain(
            `cmocka_run_group_tests(${projectName}_tests, setup, teardown)`
        );
    });
    it('should generate full test code with the project name', () => {
        const projectName = 'parser';
        const result = getBaseCmockaTest(projectName);
        const expected = readFileSync(join(__dirname, 'expected.txt'), {
            encoding: 'utf-8',
        }).replace(/ {4}/g, '\t');
        expect(result).toEqual(expected);
    });
});
