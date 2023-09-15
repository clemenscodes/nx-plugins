import type { ExecuteExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';

export const executeBinary = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: ExecuteExecutorSchema
): boolean => {
    const bin = `${workspaceRoot}/dist/${projectRoot}/${projectName}`;
    const { args } = options;
    const { success } = runCommand(bin, ...args);
    return success;
};
