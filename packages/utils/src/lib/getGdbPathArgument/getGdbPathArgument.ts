import { trimLib } from '@/util';
import { join } from 'path';

export const getGdbPathArgument = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
) => {
    const binaryName = trimLib(projectName);
    const path = join(workspaceRoot, 'dist', projectRoot, binaryName);
    return path;
};
