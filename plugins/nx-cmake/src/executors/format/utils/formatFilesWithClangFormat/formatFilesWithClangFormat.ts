import type { FormatExecutorSchema } from '../../schema';
import { getFormatArguments } from '../getFormatArguments/getFormatArguments';
import { getProjectFiles, filterSourceFiles } from '@/file';
import { checkCommandExists, executeCommandForFiles } from '@/command';
import { getClangFormat } from '../getClangFormat/getClangFormat';

export const formatFilesWithClangFormat = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema,
): Promise<boolean> => {
    checkCommandExists('clang-format');
    const clangFormat = getClangFormat();
    const formatArgs = await getFormatArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const files = getProjectFiles(workspaceRoot, projectRoot);
    const sourceFiles = filterSourceFiles(files);
    const success = executeCommandForFiles(
        clangFormat,
        formatArgs,
        sourceFiles,
    );
    return success;
};
