import type { LintExecutorSchema } from '../../schema';
import { getProjectFiles } from '../../../../utils/fileUtils/getProjectFiles/getProjectFiles';
import { filterSourceFiles } from '../../../../utils/fileUtils/filterSourceFiles/filterSourceFiles';
import { CProjectType } from '../../../../models/types';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import { getLintArguments } from '../getLintArguments/getLintArguments';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';

export const lintFilesWithClangTidy = async (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema,
    projectType: CProjectType,
): Promise<boolean> => {
    const lintCommand = checkCommandExists('clang-tidy');
    const lintArgs = await getLintArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const files = getProjectFiles(workspaceRoot, projectRoot);
    const sourceFiles = filterSourceFiles(
        workspaceRoot,
        projectRoot,
        projectType,
        files,
    );
    const { success } = runCommand(lintCommand, ...lintArgs, ...sourceFiles);
    return success;
};
