import { getBuildPath } from '../getBuildPath/getBuildPath';

export const getClangTidyBuildPathArgument = (
    workspaceRoot: string,
    projectRoot: string,
): string => {
    const buildPath = getBuildPath(workspaceRoot, projectRoot);
    const buildArgument = `-p=${buildPath}`;
    return buildArgument;
};
