import type { BaseOptions } from '../../../models/types';
import { getCMakeC } from '../getCmakeC/getCMakeC';
import { getLanguageExtension } from '../getLanguageExtension/getLanguageExtension';
import { getProjectRoot } from '../getProjectRoot/getProjectRoot';
import { CProjectType } from '../../../models/types';
import { names, offsetFromRoot } from '@nx/devkit';

export const resolveOptions = <T extends BaseOptions, K extends Required<T>>(
    options: T,
): K => {
    const { language } = options;
    const resolvedName = names(options.name);
    const { name, constantName } = resolvedName;
    const snakeCaseName = constantName.toLowerCase();
    const projectRoot = getProjectRoot(name, CProjectType.Lib);
    const relativeRootPath = offsetFromRoot(projectRoot);
    const languageExtension = getLanguageExtension(language);
    const cmakeC = getCMakeC(language);

    const resolvedOptions = {
        ...options,
        name,
        constantName,
        snakeCaseName,
        languageExtension,
        relativeRootPath,
        cmakeC,
    } as K;

    return resolvedOptions;
};
