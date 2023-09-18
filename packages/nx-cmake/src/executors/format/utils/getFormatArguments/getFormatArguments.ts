import type { FormatExecutorSchema } from '../../schema';
import { getConfigFile } from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

export const getStyleArgument = (clangFormatFile: string): string => {
    const styleArgument = `--style=file:${clangFormatFile}`;
    return styleArgument;
};

export const getVerboseArgument = (verbose: boolean): string[] => {
    return verbose ? ['--verbose'] : [];
};

export const getEditFileInPlaceArgument = (
    editFilesInPlace: boolean
): string[] => {
    return editFilesInPlace ? ['-i'] : [];
};

export const getFormatArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema
): Promise<string[]> => {
    const { args, verbose, editFilesInPlace } = options;
    const clangFormatFile = await getConfigFile(
        '.clang-format',
        workspaceRoot,
        projectRoot
    );
    const style = getStyleArgument(clangFormatFile);
    const isVerbose = getVerboseArgument(verbose);
    const inPlace = getEditFileInPlaceArgument(editFilesInPlace);
    const formatCommandArguments = [style, ...isVerbose, ...inPlace, ...args];
    return formatCommandArguments;
};
