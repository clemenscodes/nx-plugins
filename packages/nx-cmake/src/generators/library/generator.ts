import { join } from 'path';
import type { LibGeneratorSchema } from './schema';
import {
    type Tree,
    addProjectConfiguration,
    formatFiles,
    generateFiles,
    offsetFromRoot,
    workspaceLayout,
} from '@nx/devkit';
import { CProjectType } from '../../models/types';
import { resolveOptions } from '../../utils/resolveOptions/resolveOptions';
import { getProjectTargets } from '../../utils/getProjectTargets/getProjectTargets';

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
    const resolvedOptions = resolveOptions(options);
    const { name, skipFormat, generateTests, language } = resolvedOptions;
    const { libsDir } = workspaceLayout();
    const projectRoot = `${libsDir}/${name}`;
    const relativeRootPath = offsetFromRoot(projectRoot);
    const targets = getProjectTargets(CProjectType.Lib);
    const testTargets = getProjectTargets(CProjectType.Test);
    const lib = `lib${name}`;
    const test = `test${name}`;
    const testLib = language === 'C++' ? 'gtest' : 'cmocka';
    const includeGoogleTest =
        generateTests && language === 'C++' ? 'include(GoogleTest)' : '';
    const setupTests =
        generateTests && language === 'C'
            ? `add_test(UnitTests ${test})`
            : `gtest_discover_tests(${test})`;
    const baseGtest =
        `TEST(${lib}, test_${name}) {\n` + `\tEXPECT_EQ(${name}(), 0);\n}\n`;
    const baseCmocka =
        `static int setup(void **state) {\n` +
        `\t(void) state;\n` +
        `\treturn 0;\n}\n\n` +
        `static int teardown(void **state) {\n` +
        `\t(void) state;\n` +
        `\treturn 0;\n}\n\n` +
        `static void test_${name}(void **state) {\n` +
        `\t(void) state;\n` +
        `\t${name}();\n}\n\n` +
        `int main(void) {\n` +
        `\tconst struct CMUnitTest ${name}_tests[] = {\n` +
        `\t\tcmocka_unit_test(test_${name}),\n\t};\n` +
        `\treturn cmocka_run_group_tests(${name}_tests, setup, teardown);\n}\n`;
    const baseTest =
        generateTests && language === 'C++' ? baseGtest : baseCmocka;

    resolvedOptions.includeGoogleTest = includeGoogleTest;
    resolvedOptions.setupTests = setupTests;
    resolvedOptions.baseTest = baseTest;
    resolvedOptions.testLib = testLib;
    resolvedOptions.relativeRootPath = relativeRootPath;

    addProjectConfiguration(tree, lib, {
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

    addProjectConfiguration(tree, test, {
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
