import type { ExecuteExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { fileExists } from '../../../../utils/fileUtils/fileExists/fileExists';

export const executeBinary = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: ExecuteExecutorSchema
): boolean => {
    const bin = `${workspaceRoot}/dist/${projectRoot}/${projectName}`;
    if (!fileExists(bin)) {
        throw new Error(
            `The binary of ${projectName} was not found and cound not be executed.`
        );
    }
    const { args } = options;
    const { success } = runCommand(bin, ...args);
    return success;
};
