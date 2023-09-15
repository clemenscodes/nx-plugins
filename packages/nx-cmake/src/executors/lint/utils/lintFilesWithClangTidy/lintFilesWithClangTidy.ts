import type { LintExecutorSchema } from '../../schema';
import { getProjectFiles } from '../../../../utils/fileUtils/getProjectFiles/getProjectFiles';
import { filterSourceFiles } from '../../../../utils/fileUtils/filterSourceFiles/filterSourceFiles';
import { CProjectType } from '../../../../models/types';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import { executeCommandForFiles } from '../../../../utils/commandUtils/executeCommandForFiles/executeCommandForFiles';
import { getLintArguments } from '../getLintArguments/getLintArguments';

export const lintFilesWithClangTidy = async (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema,
    projectType: CProjectType
): Promise<boolean> => {
    const { args } = options;
    const lintCommand = checkCommandExists('clang-tidy');
    const lintArgs = await getLintArguments(workspaceRoot, projectRoot, args);
    const files = getProjectFiles(workspaceRoot, projectRoot);
    const sourceFiles = filterSourceFiles(
        workspaceRoot,
        projectRoot,
        projectType,
        files
    );
    const success = executeCommandForFiles(lintCommand, lintArgs, sourceFiles);
    return success;
};
