import { CProjectType } from '@/types';
import { names, offsetFromRoot } from '@nx/devkit';
import { getPluginConfig } from '../getPluginConfig/getPluginConfig';
import {
    getLanguageExtension,
    getProjectRoot,
    getWorkspaceLayout,
} from '@/util';
import { getCmakeC } from '../../generators/init/getCmakeC/getCmakeC';
import { GeneratorBaseOptions } from '../../generators/generator';

export const resolveOptions = <
    T extends GeneratorBaseOptions,
    K extends Required<T>,
>(
    options: T,
): K => {
    const { appsDir, libsDir } = getWorkspaceLayout();
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
        appsDir,
        cmakeC,
    } as K;

    return resolvedOptions;
};
