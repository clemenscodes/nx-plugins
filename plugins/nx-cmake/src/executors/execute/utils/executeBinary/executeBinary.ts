import type { ExecuteExecutorSchema } from '../../schema';
import { runCommand } from '@/command';
import { fileExists } from '@/file';

export const executeBinary = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: ExecuteExecutorSchema,
): boolean => {
    const { args, release } = options;
    const config = release ? 'Release' : 'Debug';
    const bin = `${workspaceRoot}/dist/${projectRoot}/${config}/${projectName}`;
    if (!fileExists(bin)) {
        throw new Error(
            `The binary of ${projectName} was not found and cound not be executed.`,
        );
    }
    const { success } = runCommand(bin, ...args);
    return success;
};
