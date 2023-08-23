import { execSync } from 'child_process';

export const runCommand = (
    command: string,
    ...args: string[]
): { success: boolean } => {
    process.env.FORCE_COLOR = 'true';
    const cmd = `${command} ${args.join(' ')}`;
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
