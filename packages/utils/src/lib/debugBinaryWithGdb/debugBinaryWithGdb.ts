import { checkCommandExists } from '../checkCommandExists/checkCommandExists';
import { getGdb } from '../getGdb/getGdb';
import { getGdbArguments } from '../getGdbArguments/getGdbArguments';
import { DebugExecutorSchema, GDB } from '@/config';
import { runCommand } from '../runCommand/runCommand';

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
