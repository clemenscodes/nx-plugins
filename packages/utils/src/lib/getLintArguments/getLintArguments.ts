import { LintExecutorSchema } from '@/config';
import { getClangTidyBuildPathArgument } from './getClangTidyBuildPathArgument/getClangTidyBuildPathArgument';
import { getClangTidyConfigArgument } from './getClangTidyConfigArgument/getClangTidyConfigArgument';

export const getLintArguments = (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema,
): string[] => {
    const { args } = options;
    const configArgument = getClangTidyConfigArgument(
        workspaceRoot,
        projectRoot,
    );
    const buildArgument = getClangTidyBuildPathArgument(
        workspaceRoot,
        projectRoot,
    );
    const lintCommandArguments = [configArgument, buildArgument, ...args];
    return lintCommandArguments;
};
