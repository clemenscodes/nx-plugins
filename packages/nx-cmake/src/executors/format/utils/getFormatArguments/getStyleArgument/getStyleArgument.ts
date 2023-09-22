import { getConfigFile } from '../../../../../utils/fileUtils/getConfigFile/getConfigFile';

export const getStyleArgument = async (
    workspaceRoot: string,
    projectRoot: string,
    clangFormatFile: string,
): Promise<string> => {
    const configFile = await getConfigFile(
        workspaceRoot,
        projectRoot,
        clangFormatFile,
    );
    const styleArgument = `--style=file:${configFile}`;
    return styleArgument;
};
