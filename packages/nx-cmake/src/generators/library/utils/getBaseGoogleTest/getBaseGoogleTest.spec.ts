import { getBaseGoogleTest } from './getBaseGoogleTest';

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
        const expected =
            'TEST(libgui, test_gui) {\n\tEXPECT_EQ(gui(), 0);\n}\n';
        expect(result).toEqual(expected);
    });
});
