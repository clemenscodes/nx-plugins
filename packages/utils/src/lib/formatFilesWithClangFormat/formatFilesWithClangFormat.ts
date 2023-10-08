import { getFormatArguments } from '../getFormatArguments/getFormatArguments';
import { getProjectFiles, filterSourceFiles } from '@/file';
import { getClangFormat } from '../getClangFormat/getClangFormat';
import { CLANG_FORMAT, FormatExecutorSchema } from '@/config';
import { checkCommandExists } from '../checkCommandExists/checkCommandExists';
import { executeCommandForFiles } from '../executeCommandForFiles/executeCommandForFiles';

export const formatFilesWithClangFormat = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema,
): Promise<boolean> => {
    checkCommandExists(CLANG_FORMAT);
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
