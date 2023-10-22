import type { LibGeneratorSchema, LibSchema } from '@/config';
import { offsetFromRoot } from '@nx/devkit';
import { CProjectType } from '@/types';
import { resolveOptions } from '../resolveOptions/resolveOptions';
import { getProjectRoot } from '../getProjectRoot/getProjectRoot';
import {
    getLibName,
    getTestName,
    getTestLib,
    snakeCaseToCamelCase,
} from '@/util';

export const resolveLibOptions = (options: LibGeneratorSchema): LibSchema => {
    const resolvedOptions = resolveOptions<LibGeneratorSchema, LibSchema>(
        options,
    );
    const { name, language } = resolvedOptions;
    const projectRoot = getProjectRoot(name, CProjectType.Lib);
    const relativeRootPath = offsetFromRoot(projectRoot);
    const libName = getLibName(name);
    const testName = getTestName(name);
    const testLib = getTestLib(language);
    const snakeCaseProjectName = name.replace(/-/g, '_').toLowerCase();
    const snakeCaseLibName = libName.replace(/-/g, '_').toLowerCase();
    const camelCaseProjectName = snakeCaseToCamelCase(snakeCaseProjectName);

    resolvedOptions.testLib = testLib;
    resolvedOptions.testName = testName;
    resolvedOptions.libName = libName;
    resolvedOptions.snakeCaseLibName = snakeCaseLibName;
    resolvedOptions.snakeCaseProjectName = snakeCaseProjectName;
    resolvedOptions.camelCaseProjectName = camelCaseProjectName;
    resolvedOptions.relativeRootPath = relativeRootPath;
    resolvedOptions.projectRoot = projectRoot;

    return resolvedOptions;
};
