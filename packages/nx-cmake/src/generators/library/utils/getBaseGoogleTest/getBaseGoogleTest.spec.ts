import { getBaseGoogleTest } from './getBaseGoogleTest';

describe('getBaseGoogleTest', () => {
    it('should generate test code with the library name and project name', () => {
        const libName = 'libnx-cmake-test-c';
        const projectName = 'nx-cmake-test-c';
        const result = getBaseGoogleTest(libName, projectName);
        expect(result).toContain(
            `TEST(libnx_cmake_test_c, test_nx_cmake_test_c)`,
        );
        expect(result).toContain(`EXPECT_EQ(nx_cmake_test_c(), 0);`);
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
