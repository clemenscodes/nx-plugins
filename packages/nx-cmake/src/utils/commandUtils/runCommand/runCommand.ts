import { output } from '@nx/devkit';
import { execSync } from 'child_process';

export const printError = (cmd: string, e: Error) => {
    output.error({
        title: `nx-cmake command failed: ${cmd}`,
        bodyLines: e.message.split('\n'),
    });
};

export const runCommand = (
    command: string,
    ...args: string[]
): { success: boolean } => {
    process.env.FORCE_COLOR = 'true';
    const cmd = args.length > 0 ? `${command} ${args.join(' ')}` : command;
    try {
        execSync(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'inherit', 'pipe'],
        });
        return { success: true };
    } catch (e) {
        if (typeof e === 'object' && 'stderr' in e) {
            output.error({
                title: `nx-cmake command failed: ${cmd}`,
                bodyLines: e.stderr.split('\n'),
            });
        }
        if (e instanceof Error) {
            printError(cmd, e);
        }
        return { success: false };
    }
};
