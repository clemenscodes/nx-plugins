import type { DebugExecutorSchema } from '../../schema';
import { runCommand, checkCommandExists } from '@/command';
import { trimLib } from '../../../../utils/generatorUtils/trimLib/trimLib';

export const debugBinaryWithGdb = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: DebugExecutorSchema,
): boolean => {
    const gdbCommand = checkCommandExists('gdb');
    const { args } = options;
    const name = trimLib(projectName);
    const bin = `${workspaceRoot}/dist/${projectRoot}/${name}`;
    const { success } = runCommand(gdbCommand, bin, ...args);
    return success;
};
