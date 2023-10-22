import { getConfigFile } from '@/file';

export const getStyleArgument = (
    workspaceRoot: string,
    projectRoot: string,
    clangFormatFile: string,
): string => {
    const configFile = getConfigFile(
        workspaceRoot,
        projectRoot,
        clangFormatFile,
    );
    const styleArgument = `--style=file:${configFile}`;
    return styleArgument;
};
