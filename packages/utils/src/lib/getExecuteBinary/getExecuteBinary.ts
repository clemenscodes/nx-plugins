import { ExecuteExecutorSchema } from '@/config';
import { fileExists } from '@/file';
import { isWindows } from '@/util';
import { join } from 'path';

export const getExecuteBinary = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: ExecuteExecutorSchema,
): string => {
    const { release } = options;
    const config = release ? 'Release' : 'Debug';
    let binary = join(workspaceRoot, 'dist', projectRoot, config, projectName);
    if (isWindows(process.platform)) {
        binary += '.exe';
    }
    if (!fileExists(binary)) {
        throw new Error(
            `The binary of ${projectName} was not found and could not be executed [Path: ${binary}]`,
        );
    }
    return binary;
};
