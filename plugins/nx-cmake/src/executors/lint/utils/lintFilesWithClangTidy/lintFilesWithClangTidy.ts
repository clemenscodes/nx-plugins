import type { LintExecutorSchema } from '../../schema';
import { getProjectFiles, filterSourceFiles } from '@/file';
import { runCommand, checkCommandExists } from '@/command';
import { getLintArguments } from '../getLintArguments/getLintArguments';
import { getClangTidy } from '../getClangTidy/getClangTidy';

export const lintFilesWithClangTidy = async (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema,
): Promise<boolean> => {
    checkCommandExists('clang-tidy');
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