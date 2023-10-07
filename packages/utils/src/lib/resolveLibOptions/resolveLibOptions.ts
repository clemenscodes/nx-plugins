import type { LibGeneratorSchema, LibOptions } from '@/config';
import { offsetFromRoot } from '@nx/devkit';
import { getBaseTest } from '../getBaseTest/getBaseTest';
import { getGoogleTestInclude } from '../getGoogleTestInclude/getGoogleTestInclude';
import { getLibName } from '../getLibName/getLibName';
import { getTestLib } from '../getTestLib/getTestLib';
import { getTestName } from '../getTestName/getTestName';
import { getTestSetup } from '../getTestSetup/getTestSetup';
import { CProjectType } from '@/config';
import { resolveOptions } from '../resolveOptions/resolveOptions';
import { getProjectRoot } from '../getProjectRoot/getProjectRoot';

export const resolveLibOptions = (options: LibGeneratorSchema): LibOptions => {
    const resolvedOptions = resolveOptions<LibGeneratorSchema, LibOptions>(
        options,
    );
    const { name, generateTests, language } = resolvedOptions;
    const projectRoot = getProjectRoot(name, CProjectType.Lib);
    const relativeRootPath = offsetFromRoot(projectRoot);
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
    resolvedOptions.testName = testName;
    resolvedOptions.libName = libName;
    resolvedOptions.relativeRootPath = relativeRootPath;
    resolvedOptions.projectRoot = projectRoot;

    return resolvedOptions;
};