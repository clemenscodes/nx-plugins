import { getStyleArgument } from './getStyleArgument/getStyleArgument';
import { getEditFileInPlaceArgument } from './getEditFilesInPlaceArgument/getEditFilesInPlaceArgument';
import { getVerboseArgument } from './getVerboseArgument/getVerboseArgument';
import { FormatExecutorSchema } from '@/config';

export const getFormatArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema,
): Promise<string[]> => {
    const { args, verbose, editFilesInPlace } = options;
    const style = await getStyleArgument(
        workspaceRoot,
        projectRoot,
        '.clang-format.yml',
    );
    const isVerbose = getVerboseArgument(verbose);
    const inPlace = getEditFileInPlaceArgument(editFilesInPlace);
    const formatCommandArguments = [style, ...isVerbose, ...inPlace, ...args];
    return formatCommandArguments;
};
