export const getBaseGoogleTest = (libName: string, projectName: string) => {
    return (
        `TEST(${libName}, test_${projectName}) {\n` +
        `\tEXPECT_EQ(${projectName}(), 0);\n}\n`
    );
};
