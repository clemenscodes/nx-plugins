import type { LintExecutorSchema } from '../../schema';
import { getConfigFile } from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

export const getBuildPath = (
    workspaceRoot: string,
    projectRoot: string
): string => {
    const buildPath = `${workspaceRoot}/dist/${projectRoot}/compile_commands.json`;
    return buildPath;
};

export const getClangTidyBuildPathArgument = (
    workspaceRoot: string,
    projectRoot: string
): string => {
    const buildPath = getBuildPath(workspaceRoot, projectRoot);
    const buildArgument = `-p=${buildPath}`;
    return buildArgument;
};

export const getClangTidyConfigArgument = async (
    workspaceRoot: string,
    projectRoot: string
): Promise<string> => {
    const configFile = await getConfigFile(
        '.clang-tidy',
        workspaceRoot,
        projectRoot
    );
    const configArgument = `--config-file=${configFile}`;
    return configArgument;
};

export const getLintArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema
): Promise<string[]> => {
    const { args } = options;
    const configArgument = await getClangTidyConfigArgument(
        workspaceRoot,
        projectRoot
    );
    const buildArgument = getClangTidyBuildPathArgument(
        workspaceRoot,
        projectRoot
    );
    const lintCommandArguments = [configArgument, buildArgument, ...args];
    return lintCommandArguments;
};
