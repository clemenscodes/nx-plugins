import { getProjectFiles, filterSourceFiles } from '@/file';
import { checkCommandExists, runCommand } from '@/command';
import { getLintArguments } from '../getLintArguments/getLintArguments';
import { CLANG_TIDY, getClangTidy } from '../../../config';
import { LintExecutorSchema } from '../../executor';

export const lintFilesWithClangTidy = (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema,
): boolean => {
    checkCommandExists(CLANG_TIDY);
    const clangTidy = getClangTidy();
    const lintArgs = getLintArguments(workspaceRoot, projectRoot, options);
    const files = getProjectFiles(workspaceRoot, projectRoot);
    const sourceFiles = filterSourceFiles(files);
    const { success } = runCommand(clangTidy, ...lintArgs, ...sourceFiles);
    return success;
};
