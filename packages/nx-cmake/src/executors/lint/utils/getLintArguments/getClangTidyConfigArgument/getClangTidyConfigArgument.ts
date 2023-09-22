import { getConfigFile } from '../../../../../utils/fileUtils/getConfigFile/getConfigFile';

export const getClangTidyConfigArgument = async (
    workspaceRoot: string,
    projectRoot: string,
): Promise<string> => {
    const configFile = await getConfigFile(
        workspaceRoot,
        projectRoot,
        '.clang-tidy.yml',
    );
    const configArgument = `--config-file=${configFile}`;
    return configArgument;
};
