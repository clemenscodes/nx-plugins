import type { C } from '@/config';
import { CProjectType } from '@/config';
import { getProjectTypeFromConfigFileContent } from './getProjectTypeFromConfigFileContent/getProjectFileFromConfigFileContent';
import { readProjectFile } from './readProjectFile/readProjectFile';
import { getLanguageVariant } from './getLanguageVariant/getLanguageVariant';
import { output } from '@nx/devkit';

export const getProjectTypeAndVariant = (
    projectConfigurationFile: string,
): [CProjectType, C] => {
    try {
        const configFileContent = readProjectFile(projectConfigurationFile);
        const type = getProjectTypeFromConfigFileContent(configFileContent);
        const languageVariant = getLanguageVariant(configFileContent);
        return [type, languageVariant];
    } catch (e) {
        output.error({
            title: `Failed to determine project type or variant for the configuration file ${projectConfigurationFile}`,
        });
        throw new Error();
    }
};
