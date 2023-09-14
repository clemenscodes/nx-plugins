import type { FormatExecutorSchema } from '../../schema';
import { getFormatArguments } from '../getFormatArguments/getFormatArguments';
import { checkClangFormatExists } from '../checkClangFormatExists/checkClangFormatExists';
import { getProjectFiles } from '../../../../utils/fileUtils/getProjectFiles/getProjectFiles';
import { filterSourceFiles } from '../../../../utils/fileUtils/filterSourceFiles/filterSourceFiles';
import { executeFormatCommand } from '../executeFormatCommand/executeFormatCommand';
import { CProjectType } from '../../../../models/types';

export const formatFilesWithClangFormat = async (
    workspaceRoot: string,
    projectRoot: string,
    options: FormatExecutorSchema,
    projectType: CProjectType
): Promise<boolean> => {
    const { args } = options;
    const formatCommand = checkClangFormatExists();
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
    const success = executeFormatCommand(
        formatCommand,
        formatArgs,
        sourceFiles
    );
    return success;
};
