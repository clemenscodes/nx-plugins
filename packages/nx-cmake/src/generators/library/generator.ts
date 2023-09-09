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
import { getBaseTest } from './utils/getBaseTest';
import { getGoogleTestInclude } from './utils/getGoogleTestInclude';
import { getLibName } from './utils/getLibName';
import { getTestLib } from './utils/getTestLib';
import { getTestName } from './utils/getTestName';
import { getTestSetup } from './utils/getTestSetup';

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
