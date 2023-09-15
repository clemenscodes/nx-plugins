import type { FormatExecutorSchema } from '../../schema';
import { getFormatArguments } from '../getFormatArguments/getFormatArguments';
import { getProjectFiles } from '../../../../utils/fileUtils/getProjectFiles/getProjectFiles';
import { filterSourceFiles } from '../../../../utils/fileUtils/filterSourceFiles/filterSourceFiles';
import { CProjectType } from '../../../../models/types';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import { executeCommandForFiles } from '../../../../utils/commandUtils/executeCommandForFiles/executeCommandForFiles';

export const formatFilesWithClangFormat = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema,
    projectType: CProjectType
): Promise<boolean> => {
    const { args } = options;
    const formatCommand = checkCommandExists('clang-format');
    const formatArgs = await getFormatArguments(
        workspaceRoot,
        projectRoot,
        args
    );
    const files = getProjectFiles(workspaceRoot, projectRoot);
    const sourceFiles = filterSourceFiles(
        workspaceRoot,
        projectRoot,
        projectType,
        files
    );
    const success = executeCommandForFiles(
        formatCommand,
        formatArgs,
        sourceFiles
    );
    return success;
};
