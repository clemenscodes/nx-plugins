import { getFormatArguments } from '../getFormatArguments/getFormatArguments';
import { getProjectFiles, filterSourceFiles } from '@/file';
import { CLANG_FORMAT, FormatExecutorSchema, getClangFormat } from '@/config';
import { executeCommandForFiles, checkCommandExists } from '@/util';

export const formatFilesWithClangFormat = (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema,
): boolean => {
    checkCommandExists(CLANG_FORMAT);
    const clangFormat = getClangFormat();
    const formatArgs = getFormatArguments(workspaceRoot, projectRoot, options);
    const files = getProjectFiles(workspaceRoot, projectRoot);
    const sourceFiles = filterSourceFiles(files);
    const success = executeCommandForFiles(
        clangFormat,
        formatArgs,
        sourceFiles,
    );
    return success;
};
