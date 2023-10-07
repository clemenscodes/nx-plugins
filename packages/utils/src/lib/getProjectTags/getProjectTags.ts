import type { ProjectConfiguration } from '@nx/devkit';
import type { C } from '@/config';
import { CProjectType } from '@/config';
import { PLUGIN_NAME } from '@/config';
import { getLanguageExtension } from '../getLanguageExtension/getLanguageExtension';

export const getProjectTags = (
    projectType: CProjectType,
    language: C,
): ProjectConfiguration['tags'] => {
    const languageExtension = getLanguageExtension(language);
    if (projectType === CProjectType.Test) {
        return [PLUGIN_NAME, languageExtension, 'test'];
    }
    return [PLUGIN_NAME, languageExtension];
};
