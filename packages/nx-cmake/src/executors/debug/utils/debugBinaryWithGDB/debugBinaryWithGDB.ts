import type { DebugExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { trimLib } from '../../../../utils/generatorUtils/trimLib/trimLib';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

export const debugBinaryWithGDB = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: DebugExecutorSchema
): boolean => {
    const gdbCommand = checkCommandExists('gdb');
    const { args } = options;
    const name = trimLib(projectName);
    const bin = `${workspaceRoot}/dist/${projectRoot}/${name}`;
    const { success } = runCommand(gdbCommand, bin, ...args);
    return success;
};
