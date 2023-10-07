import type { BaseOptions } from '@/config';
import { getCMakeC } from '../getCmakeC/getCMakeC';
import { getLanguageExtension } from '../getLanguageExtension/getLanguageExtension';
import { getProjectRoot } from '../getProjectRoot/getProjectRoot';
import { CProjectType } from '@/config';
import { names, offsetFromRoot } from '@nx/devkit';

export const resolveOptions = <T extends BaseOptions, K extends Required<T>>(
    options: T,
): K => {
    const { language } = options;
    const resolvedName = names(options.name);
    const { name, constantName, propertyName, className } = resolvedName;
    const snakeCaseName = constantName.toLowerCase();
    const camelCaseName = propertyName;
    const projectRoot = getProjectRoot(name, CProjectType.Lib);
    const relativeRootPath = offsetFromRoot(projectRoot);
    const languageExtension = getLanguageExtension(language);
    const cmakeC = getCMakeC(language);

    const resolvedOptions = {
        ...options,
        name,
        constantName,
        snakeCaseName,
        camelCaseName,
        className,
        languageExtension,
        relativeRootPath,
        cmakeC,
    } as K;

    return resolvedOptions;
};
