import { readFileSync } from 'fs';
import { CProjectType } from '../../../models/types';
import { PROJECT_FILE } from '../../../config/projectFilePattern';

export const getProjectTypeFromConfigFileContent = (
    content: string
): CProjectType => {
    if (content.includes('enable_testing()')) {
        return CProjectType.Test;
    }
    if (content.includes('set_library_settings')) {
        return CProjectType.Lib;
    }
    if (content.includes('set_binary_settings')) {
        return CProjectType.App;
    }
    throw new Error('Failed to determine project type');
};

export const readProjectFile = (projectFile: string): string => {
    if (!projectFile.includes(PROJECT_FILE)) {
        throw new Error('Invalid project file');
    }
    const fileContent = readFileSync(projectFile, {
        encoding: 'utf-8',
    });
    return fileContent;
};

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
