import { fileExists } from '@/file';
import { ExecuteExecutorSchema } from '../../schema';
import { join } from 'path';

export const getExecuteBinary = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: ExecuteExecutorSchema,
): string => {
    const { release } = options;
    const config = release ? 'Release' : 'Debug';
    const binary = join(
        workspaceRoot,
        'dist',
        projectRoot,
        config,
        projectName,
    );
    if (!fileExists(binary)) {
        throw new Error(
            `The binary of ${projectName} was not found and cound not be executed [Path: ${binary}]`,
        );
    }
    return binary;
};
