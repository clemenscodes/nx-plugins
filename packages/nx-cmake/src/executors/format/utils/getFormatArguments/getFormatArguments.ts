import type { FormatExecutorSchema } from '../../schema';
import { getConfigFile } from '../../../../utils/fileUtils/getConfigFile/getConfigFile';
import { getStyleArgument } from './getStyleArgument/getStyleArgument';
import { getEditFileInPlaceArgument } from './getEditFilesInPlaceArgument/getEditFilesInPlaceArgument';
import { getVerboseArgument } from './getVerboseArgument/getVerboseArgument';

export const getFormatArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema
): Promise<string[]> => {
    const { args, verbose, editFilesInPlace } = options;
    const clangFormatFile = await getConfigFile(
        workspaceRoot,
        projectRoot,
        '.clang-format'
    );
    const style = getStyleArgument(clangFormatFile);
    const isVerbose = getVerboseArgument(verbose);
    const inPlace = getEditFileInPlaceArgument(editFilesInPlace);
    const formatCommandArguments = [style, ...isVerbose, ...inPlace, ...args];
    return formatCommandArguments;
};
