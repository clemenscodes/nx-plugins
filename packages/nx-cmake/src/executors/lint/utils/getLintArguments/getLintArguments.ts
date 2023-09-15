import { getConfigFile } from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

export const getLintArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    args: string[]
): Promise<string[]> => {
    const configFile = await getConfigFile(
        '.clang-tidy',
        workspaceRoot,
        projectRoot
    );

    const clangTidyChecks = '';
    const configArgument = `--config-file=${configFile}`;
    const checksArgument = `--checks=${clangTidyChecks}`;

    const lintCommandArguments = [configArgument, checksArgument, ...args];

    return lintCommandArguments;
};
