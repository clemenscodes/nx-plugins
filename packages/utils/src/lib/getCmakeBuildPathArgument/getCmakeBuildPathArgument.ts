import { join } from 'path';

export const getCmakeBuildPathArgument = (
    workspaceRoot: string,
    projectRoot: string,
): string => {
    const path = join(workspaceRoot, 'dist', projectRoot);
    return path;
};
