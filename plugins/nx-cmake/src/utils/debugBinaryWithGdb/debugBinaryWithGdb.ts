import { GDB, getGdb } from '../../config';
import { DebugExecutorSchema } from '../../executors/executor';
import { getGdbArguments } from '../getGdbArguments/getGdbArguments';
import { checkCommandExists, runCommand } from '@/util';

export const debugBinaryWithGdb = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: DebugExecutorSchema,
): boolean => {
    checkCommandExists(GDB);
    const gdbCommand = getGdb();
    const gdbArguments = getGdbArguments(
        workspaceRoot,
        projectRoot,
        projectName,
        options,
    );
    const { success } = runCommand(gdbCommand, ...gdbArguments);
    return success;
};
