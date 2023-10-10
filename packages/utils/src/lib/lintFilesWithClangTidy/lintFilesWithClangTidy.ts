import { getProjectFiles, filterSourceFiles } from '@/file';
import { getLintArguments } from '../getLintArguments/getLintArguments';
import { CLANG_TIDY, LintExecutorSchema, getClangTidy } from '@/config';
import { checkCommandExists } from '../checkCommandExists/checkCommandExists';
import { runCommand } from '../runCommand/runCommand';

export const lintFilesWithClangTidy = async (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema,
): Promise<boolean> => {
    checkCommandExists(CLANG_TIDY);
    const clangTidy = getClangTidy();
    const lintArgs = await getLintArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const files = getProjectFiles(workspaceRoot, projectRoot);
    const sourceFiles = filterSourceFiles(files);
    const { success } = runCommand(clangTidy, ...lintArgs, ...sourceFiles);
    return success;
};
