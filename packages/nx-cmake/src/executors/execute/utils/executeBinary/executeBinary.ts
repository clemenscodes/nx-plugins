import type { ExecuteExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

export const executeBinary = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: ExecuteExecutorSchema
): boolean => {
    const bin = `${workspaceRoot}/dist/${projectRoot}/${projectName}`;
    const binCommand = checkCommandExists(bin);
    const { args } = options;
    const { success } = runCommand(binCommand, ...args);
    return success;
};
