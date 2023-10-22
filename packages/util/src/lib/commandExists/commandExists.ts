import { executeCommand } from '../executeCommand/executeCommand';
import { isWindows } from '../isWindows/isWindows';

const checkCommandExistsWindows = (command: string): boolean => {
    const cmd = `where.exe ${command}`;
    const output = executeCommand(cmd);
    return !!output;
};

const checkCommandExistsUnix = (command: string): boolean => {
    const cmd = `command -v ${command}`;
    const output = executeCommand(cmd);
    return !!output;
};

export const commandExists = (command: string): boolean => {
    try {
        const [beforeSpace] = command.split(' ');
        if (isWindows(process.platform)) {
            return checkCommandExistsWindows(beforeSpace);
        }
        return checkCommandExistsUnix(beforeSpace);
    } catch {
        return false;
    }
};
