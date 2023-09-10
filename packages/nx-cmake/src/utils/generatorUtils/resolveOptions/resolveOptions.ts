import { getCMakeC } from '../getCmakeC/getCMakeC';
import type { BaseOptions } from '../../../models/base';
import { names } from '@nx/devkit';
import { getLanguageExtension } from '../getLanguageExtension/getLanguageExtension';

export const resolveOptions = <T extends Partial<BaseOptions>>(
    options: T
): T => {
    const { language } = options;
    const resolvedName = names(options.name);
    const { name, constantName } = resolvedName;
    const languageExtension = getLanguageExtension(language);
    const cmakeC = getCMakeC(language);

    const resolvedOptions = {
        ...options,
        name,
        constantName,
        languageExtension,
        cmakeC,
    };

    return resolvedOptions;
};
