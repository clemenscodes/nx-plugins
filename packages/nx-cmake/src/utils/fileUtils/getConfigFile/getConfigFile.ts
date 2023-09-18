import { fileExists } from '../fileExists/fileExists';

export const getConfigFile = async (
    configFile: string,
    workspaceRoot: string,
    projectRoot: string
): Promise<string> => {
    const projectConfigFile = `${workspaceRoot}/${projectRoot}/${configFile}`;
    const workspaceConfigFile = `${workspaceRoot}/${configFile}`;

    const projectConfigFileExists = await fileExists(projectConfigFile);
    const workspaceConfigFileExists = await fileExists(workspaceConfigFile);

    if (projectConfigFileExists) {
        return projectConfigFile;
    }

    if (workspaceConfigFileExists) {
        return workspaceConfigFile;
    }

    throw new Error(
        `Could not find ${configFile}. Please generate a preset using nx-cmake:init or provide your own.`
    );
};
