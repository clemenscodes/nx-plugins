import { CProjectType } from '../../../models/types';
import { getProjectTypeFromConfigFileContent } from './getProjectTypeFromConfigFileContent/getProjectFileFromConfigFileContent';
import { readProjectFile } from './readProjectFile/readProjectFile';

export const getProjectType = (
    projectConfigurationFile: string
): CProjectType => {
    try {
        const configFileContent = readProjectFile(projectConfigurationFile);
        return getProjectTypeFromConfigFileContent(configFileContent);
    } catch (e) {
        throw new Error(
            `Failed to determine project type for the configuration file ${projectConfigurationFile}`
        );
    }
};
