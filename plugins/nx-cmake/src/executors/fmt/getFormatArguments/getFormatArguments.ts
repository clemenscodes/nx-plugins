import { getStyleArgument } from './getStyleArgument/getStyleArgument';
import { getEditFileInPlaceArgument } from './getEditFilesInPlaceArgument/getEditFilesInPlaceArgument';
import { getVerboseArgument } from './getVerboseArgument/getVerboseArgument';
import { FormatExecutorSchema } from '../../executor';
import { CLANG_FORMAT_CONFIG_FILE } from '../../../config/getPrograms/getClangFormat/getClangFormat';

export const getFormatArguments = (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema,
): string[] => {
    const { args, verbose, editFilesInPlace } = options;
    const style = getStyleArgument(
        workspaceRoot,
        projectRoot,
        CLANG_FORMAT_CONFIG_FILE,
    );
    const isVerbose = getVerboseArgument(verbose);
    const inPlace = getEditFileInPlaceArgument(editFilesInPlace);
    const formatCommandArguments = [style, ...isVerbose, ...inPlace, ...args];
    return formatCommandArguments;
};
