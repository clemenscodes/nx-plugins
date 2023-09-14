import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';

export const executeFormatCommand = (
    formatCommand: string,
    formatArgs: string[],
    files: string[]
): boolean => {
    let success = true;

    for (const file of files) {
        const { success: result } = runCommand(
            formatCommand,
            ...formatArgs,
            file
        );
        success = success && result;
    }

    return success;
};
