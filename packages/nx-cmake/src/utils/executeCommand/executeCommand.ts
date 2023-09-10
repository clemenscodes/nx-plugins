import { execSync } from 'child_process';

export const executeCommand = (cmd: string) => {
    return execSync(cmd, {
        encoding: 'utf-8',
        stdio: ['inherit', 'pipe', 'pipe'],
    });
};
