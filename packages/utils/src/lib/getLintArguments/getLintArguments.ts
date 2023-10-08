import { LintExecutorSchema } from '@/config';
import { getClangTidyBuildPathArgument } from './getClangTidyBuildPathArgument/getClangTidyBuildPathArgument';
import { getClangTidyConfigArgument } from './getClangTidyConfigArgument/getClangTidyConfigArgument';

export const getLintArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema,
): Promise<string[]> => {
    const { args } = options;
    const configArgument = await getClangTidyConfigArgument(
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
