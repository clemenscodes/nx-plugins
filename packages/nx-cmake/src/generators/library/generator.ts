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
    resolvedOptions.relativeRootPath = relativeRootPath;
    resolvedOptions.testLib = language === 'C++' ? 'gtest' : 'cmocka';
    resolvedOptions.linkTestLib =
        name === 'cmocka' || name === 'gtest'
            ? `link_${resolvedOptions.testLib}(\${CMAKE_PROJECT_NAME})`
            : '';
    resolvedOptions.includeGoogleTest =
        generateTests && language === 'C++' ? 'include(GoogleTest)' : '';
    resolvedOptions.setupTests =
        generateTests && language === 'C'
            ? `add_test(UnitTests ${test})`
            : `gtest_discover_tests(${test})`;

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
