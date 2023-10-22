import { getFormatArguments } from '../getFormatArguments/getFormatArguments';
import { getProjectFiles, filterSourceFiles } from '@/file';
import { executeCommandForFiles, checkCommandExists } from '@/util';
import {
    FormatExecutorSchema,
    CLANG_FORMAT,
    getClangFormat,
} from '../../config';

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
