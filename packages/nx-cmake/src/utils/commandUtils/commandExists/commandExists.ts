import { executeCommand } from '../executeCommand/executeCommand';

export const commandExists = (command: string): boolean => {
    try {
        const [beforeSpace] = command.split(' ');
        const cmd = `command -v ${beforeSpace}`;
        return !!executeCommand(cmd);
    } catch {
        return false;
    }
};
