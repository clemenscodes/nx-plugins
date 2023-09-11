import { readFileSync } from 'fs';
import { getBaseGoogleTest } from './getBaseGoogleTest';
import { join } from 'path';

describe('getBaseGoogleTest', () => {
    it('should generate test code with the library name and project name', () => {
        const libName = 'MyLib';
        const projectName = 'MyProject';
        const result = getBaseGoogleTest(libName, projectName);

        expect(result).toContain(`TEST(${libName}, test_${projectName})`);
        expect(result).toContain(`EXPECT_EQ(${projectName}(), 0);`);
    });
    it('should generate test code with the library name and project name', () => {
        const libName = 'libgui';
        const projectName = 'gui';
        const result = getBaseGoogleTest(libName, projectName);
        const expected = readFileSync(join(__dirname, 'expected.txt'), {
            encoding: 'utf-8',
        }).replace(/ {4}/g, '\t');
        expect(result).toEqual(expected);
    });
});
