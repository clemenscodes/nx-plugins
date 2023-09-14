import { getClangTidyFile } from '../getClangTidyFile/getClangTidyFile';

export const getLintArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    args: string[]
): Promise<string[]> => {
    const clangTidyFile = await getClangTidyFile(workspaceRoot, projectRoot);

    const clangTidyChecks = '';
    const configArgument = `--config-file=${clangTidyFile}`;
    const checksArgument = `--checks=${clangTidyChecks}`;

    const lintCommandArguments = [configArgument, checksArgument, ...args];

    return lintCommandArguments;
};
