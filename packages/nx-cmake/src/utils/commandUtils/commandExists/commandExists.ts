import { executeCommand } from '../executeCommand/executeCommand';

export const checkCommandExistsWindows = (command: string): boolean => {
    const cmd = `where ${command}`;
    return !!executeCommand(cmd);
};

export const checkCommandExistsUnix = (command: string): boolean => {
    const cmd = `command -v ${command}`;
    return !!executeCommand(cmd);
};

export const commandExists = (command: string): boolean => {
    try {
        const [beforeSpace] = command.split(' ');
        if (process.platform === 'win32') {
            return checkCommandExistsWindows(beforeSpace);
        }
        return checkCommandExistsUnix(beforeSpace);
    } catch {
        return false;
    }
};
