import { getClangFormatFile } from '../getClangFormatFile/getClangFormatFile';

export const getFormatArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    args: string[]
): Promise<string[]> => {
    const clangFormatFile = await getClangFormatFile(
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
