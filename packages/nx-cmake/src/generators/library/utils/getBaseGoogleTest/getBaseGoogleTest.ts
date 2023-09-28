import { snakeCaseToCamelCase } from '../../../../utils/pluginUtils/snakeCaseToCamelCase/snakeCaseToCamelCase';

export const getBaseGoogleTest = (libName: string, projectName: string) => {
    const snakeCaseProjectName = projectName.replace(/-/g, '_').toLowerCase();
    const snakeCaseLibName = libName.replace(/-/g, '_').toLowerCase();
    const camelCaseProjectName = snakeCaseToCamelCase(snakeCaseProjectName);
    return (
        `TEST(${snakeCaseLibName}, test_${snakeCaseProjectName}) {\n` +
        `\tEXPECT_EQ(${camelCaseProjectName}(), 0);\n}\n`
    );
};
