import { join } from 'path';
import type { GoogleTestInclude, LibGeneratorSchema } from './schema';
import {
    type Tree,
    addProjectConfiguration,
    formatFiles,
    generateFiles,
    offsetFromRoot,
    workspaceLayout,
} from '@nx/devkit';
import { type C, CProjectType } from '../../models/types';
import { resolveOptions } from '../../utils/resolveOptions/resolveOptions';
import { getProjectTargets } from '../../utils/getProjectTargets/getProjectTargets';

export const getLibName = (name: string) => `lib${name}`;

export const getTestName = (name: string) => `test${name}`;

export const getTestLib = (language: C) => {
    return language === 'C++' ? 'gtest' : 'cmocka';
};

export const getGoogleTestInclude = (
    generateTests: boolean,
    language: C
): GoogleTestInclude => {
    return generateTests && language === 'C++' ? 'include(GoogleTest)' : '';
};

export const getTestSetup = (
    generateTests: boolean,
    language: C,
    testName: string
) => {
    return generateTests && language === 'C'
        ? `add_test(UnitTests ${testName})`
        : `gtest_discover_tests(${testName})`;
};

export const getBaseGoogleTest = (libName: string, projectName: string) => {
    return (
        `TEST(${libName}, test_${projectName}) {\n` +
        `\tEXPECT_EQ(${projectName}(), 0);\n}\n`
    );
};

export const getBaseCmockaTest = (projectName: string) => {
    return (
        `static int setup(void **state) {\n` +
        `\t(void) state;\n` +
        `\treturn 0;\n}\n\n` +
        `static int teardown(void **state) {\n` +
        `\t(void) state;\n` +
        `\treturn 0;\n}\n\n` +
        `static void test_${projectName}(void **state) {\n` +
        `\t(void) state;\n` +
        `\t${projectName}();\n}\n\n` +
        `int main(void) {\n` +
        `\tconst struct CMUnitTest ${projectName}_tests[] = {\n` +
        `\t\tcmocka_unit_test(test_${projectName}),\n\t};\n` +
        `\treturn cmocka_run_group_tests(${projectName}_tests, setup, teardown);\n}\n`
    );
};

export const getBaseTest = (
    generateTests: boolean,
    language: C,
    libName: string,
    projectName: string
) => {
    const baseGtest = getBaseGoogleTest(libName, projectName);
    const baseCmocka = getBaseCmockaTest(projectName);
    return generateTests && language === 'C++' ? baseGtest : baseCmocka;
};

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const resolvedOptions = resolveOptions(options);
    const { name, skipFormat, generateTests, language } = resolvedOptions;
    const { libsDir } = workspaceLayout();
    const projectRoot = `${libsDir}/${name}`;
    const relativeRootPath = offsetFromRoot(projectRoot);
    const targets = getProjectTargets(CProjectType.Lib);
    const testTargets = getProjectTargets(CProjectType.Test);
    const libName = getLibName(name);
    const testName = getTestName(name);
    const testLib = getTestLib(language);
    const includeGoogleTest = getGoogleTestInclude(generateTests, language);
    const setupTests = getTestSetup(generateTests, language, testName);
    const baseTest = getBaseTest(generateTests, language, libName, name);

    resolvedOptions.includeGoogleTest = includeGoogleTest;
    resolvedOptions.setupTests = setupTests;
    resolvedOptions.baseTest = baseTest;
    resolvedOptions.testLib = testLib;
    resolvedOptions.relativeRootPath = relativeRootPath;

    addProjectConfiguration(tree, libName, {
        root: projectRoot,
        projectType: 'library',
        sourceRoot: `${projectRoot}/src`,
        tags: [resolvedOptions.languageExtension],
        targets,
    });

    generateFiles(
        tree,
        join(__dirname, 'template', generateTests ? 'test' : 'config'),
        projectRoot,
        resolvedOptions
    );

    addProjectConfiguration(tree, testName, {
        root: `${projectRoot}/test`,
        projectType: 'application',
        sourceRoot: `${projectRoot}/src/test`,
        tags: [resolvedOptions.languageExtension],
        targets: testTargets,
    });

    if (!skipFormat) {
        await formatFiles(tree);
    }
}

export default libGenerator;
