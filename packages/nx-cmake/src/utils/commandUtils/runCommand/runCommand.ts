import { execSync } from 'child_process';

export const runCommand = (
    command: string,
    ...args: string[]
): { success: boolean } => {
    process.env.FORCE_COLOR = 'true';
    const cmd = args.length > 0 ? `${command} ${args.join(' ')}` : command;
    try {
        execSync(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'inherit', 'inherit'],
        });
        return { success: true };
    } catch (e) {
        return { success: false };
    }
};
