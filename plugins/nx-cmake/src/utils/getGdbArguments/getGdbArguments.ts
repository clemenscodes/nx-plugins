import { DebugExecutorSchema } from '../../executors/executor';
import { getGdbPathArgument } from '../getGdbPathArgument/getGdbPathArgument';

export const getGdbArguments = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: DebugExecutorSchema,
): string[] => {
    const { args } = options;
    const path = getGdbPathArgument(workspaceRoot, projectRoot, projectName);
    const gdbArguments = [path, ...args];
    return gdbArguments;
};
