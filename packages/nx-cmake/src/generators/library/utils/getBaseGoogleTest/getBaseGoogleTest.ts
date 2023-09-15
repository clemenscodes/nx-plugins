export const getBaseGoogleTest = (libName: string, projectName: string) => {
    const snakeCaseProjectName = projectName.replace(/-/g, '_').toLowerCase();
    const snakeCaseLibName = libName.replace(/-/g, '_').toLowerCase();
    return (
        `TEST(${snakeCaseLibName}, test_${snakeCaseProjectName}) {\n` +
        `\tEXPECT_EQ(${snakeCaseProjectName}(), 0);\n}\n`
    );
};
