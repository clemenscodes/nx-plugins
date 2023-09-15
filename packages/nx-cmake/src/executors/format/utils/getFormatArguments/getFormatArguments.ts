import { getConfigFile } from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

export const getFormatArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    args: string[]
): Promise<string[]> => {
    const clangFormatFile = await getConfigFile(
        '.clang-format',
        workspaceRoot,
        projectRoot
    );

    const styleArgument = `--style=file:${clangFormatFile}`;
    const verboseArgument = `--verbose`;
    const editFileInPlaceArgument = `-i`;

    const formatCommandArguments = [
        styleArgument,
        verboseArgument,
        editFileInPlaceArgument,
        ...args,
    ];

    return formatCommandArguments;
};
