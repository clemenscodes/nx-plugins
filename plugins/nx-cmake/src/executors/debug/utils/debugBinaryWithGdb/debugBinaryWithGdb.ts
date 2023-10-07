import type { DebugExecutorSchema } from '../../schema';
import { runCommand, checkCommandExists } from '@/command';
import { getGdb } from '../getGdb/getGdb';
import { getGdbArguments } from '../getGdbArguments/getGdbArguments';

export const debugBinaryWithGdb = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: DebugExecutorSchema,
): boolean => {
    checkCommandExists('gdb');
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
