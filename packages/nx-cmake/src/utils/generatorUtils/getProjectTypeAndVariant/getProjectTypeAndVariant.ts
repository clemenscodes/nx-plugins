import type { C } from '../../../models/types';
import { CProjectType } from '../../../models/types';
import { getProjectTypeFromConfigFileContent } from './getProjectTypeFromConfigFileContent/getProjectFileFromConfigFileContent';
import { readProjectFile } from './readProjectFile/readProjectFile';
import { getLanguageVariant } from './getLanguageVariant/getLanguageVariant';

export const getProjectTypeAndVariant = (
    projectConfigurationFile: string,
): [CProjectType, C] => {
    try {
        const configFileContent = readProjectFile(projectConfigurationFile);
        const type = getProjectTypeFromConfigFileContent(configFileContent);
        const languageVariant = getLanguageVariant(configFileContent);
        return [type, languageVariant];
    } catch (e) {
        throw new Error(
            `Failed to determine project type or variant for the configuration file ${projectConfigurationFile}`,
        );
    }
};
