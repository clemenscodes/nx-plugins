import type { C } from '@/types';
import { CProjectType } from '@/types';
import { getProjectTypeFromConfigFileContent } from './getProjectTypeFromConfigFileContent/getProjectFileFromConfigFileContent';
import { readProjectFile } from './readProjectFile/readProjectFile';
import { getLanguageVariant } from './getLanguageVariant/getLanguageVariant';

export const getProjectTypeAndVariant = (
    projectConfigurationFile: string,
): [CProjectType, C] => {
    const configFileContent = readProjectFile(projectConfigurationFile);
    const type = getProjectTypeFromConfigFileContent(configFileContent);
    const languageVariant = getLanguageVariant(configFileContent);
    return [type, languageVariant];
};
