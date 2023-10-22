import { DebugExecutorSchema } from '../../executor';
import { getGdbArguments } from '../getGdbArguments/getGdbArguments';
import { checkCommandExists, runCommand } from '@/util';
import { getGdb } from '../../../config/getPrograms/getGdb/getGdb';
import { GDB } from '../../../config/getPrograms/getPrograms';

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
