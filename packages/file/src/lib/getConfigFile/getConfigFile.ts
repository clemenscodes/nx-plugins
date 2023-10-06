import { fileExists } from '../fileExists/fileExists';
import { getAbsolutePath } from '../getAbsolutePath/getAbsolutePath';

export const getConfigFile = async (
    workspaceRoot: string,
    projectRoot: string,
    configFile: string,
): Promise<string> => {
    const joinedProjectRoot = getAbsolutePath(workspaceRoot, projectRoot);
    const projectConfigFile = getAbsolutePath(joinedProjectRoot, configFile);
    const workspaceConfigFile = getAbsolutePath(workspaceRoot, configFile);
    const projectConfigFileExists = await fileExists(projectConfigFile);
    const workspaceConfigFileExists = await fileExists(workspaceConfigFile);

    if (projectConfigFileExists) {
        return projectConfigFile;
    }

    if (workspaceConfigFileExists) {
        return workspaceConfigFile;
    }

    throw new Error(
        `Could not find ${configFile}. Please generate a preset using nx-cmake:init or provide your own.`,
    );
};
