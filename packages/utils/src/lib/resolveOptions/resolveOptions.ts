import type { GeneratorBaseOptions } from '@/config';
import { getLanguageExtension } from '../getLanguageExtension/getLanguageExtension';
import { getProjectRoot } from '../getProjectRoot/getProjectRoot';
import { CProjectType, getCmakeC } from '@/config';
import { names, offsetFromRoot } from '@nx/devkit';
import { getPluginConfig } from '../getPluginConfig/getPluginConfig';
import { getWorkspaceLayout } from '../getWorkspaceLayout/getWorkspaceLayout';

export const resolveOptions = <
    T extends GeneratorBaseOptions,
    K extends Required<T>,
>(
    options: T,
): K => {
    const { libsDir } = getWorkspaceLayout();
    const { language } = options;
    const resolvedName = names(options.name);
    const { name, constantName, propertyName, className } = resolvedName;
    const snakeCaseName = constantName.toLowerCase();
    const camelCaseName = propertyName;
    const projectRoot = getProjectRoot(name, CProjectType.Lib);
    const relativeRootPath = offsetFromRoot(projectRoot);
    const languageExtension = getLanguageExtension(language);
    const cmakeC = getCmakeC(language);
    const { cmakeConfigDir, workspaceName } = getPluginConfig();

    const resolvedOptions = {
        ...options,
        name,
        constantName,
        snakeCaseName,
        camelCaseName,
        className,
        languageExtension,
        relativeRootPath,
        workspaceName,
        cmakeConfigDir,
        libsDir,
        cmakeC,
    } as K;

    return resolvedOptions;
};
