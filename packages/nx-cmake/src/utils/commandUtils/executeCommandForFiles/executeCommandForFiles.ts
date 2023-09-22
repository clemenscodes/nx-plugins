import { runCommand } from '../runCommand/runCommand';

export const executeCommandForFiles = (
    command: string,
    args: string[],
    files: string[],
): boolean => {
    let success = true;

    for (const file of files) {
        const { success: result } = runCommand(command, ...args, file);
        success = success && result;
    }

    return success;
};
