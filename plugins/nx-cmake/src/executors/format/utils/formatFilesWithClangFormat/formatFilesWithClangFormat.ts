import type { FormatExecutorSchema } from '../../schema';
import { getFormatArguments } from '../getFormatArguments/getFormatArguments';
import { getProjectFiles, filterSourceFiles } from '@/file';
import { checkCommandExists, executeCommandForFiles } from '@/command';

export const formatFilesWithClangFormat = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema,
): Promise<boolean> => {
    const formatCommand = checkCommandExists('clang-format');
    const formatArgs = await getFormatArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const files = getProjectFiles(workspaceRoot, projectRoot);
    const sourceFiles = filterSourceFiles(files);
    const success = executeCommandForFiles(
        formatCommand,
        formatArgs,
        sourceFiles,
    );
    return success;
};
