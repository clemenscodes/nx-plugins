import { output } from '@nx/devkit';
import { execSync } from 'child_process';
import { logger } from '../../pluginUtils/logger/logger';
import { getCompiler } from '../../pluginUtils/getCompiler/getCompiler';

export const runCommand = (
    command: string,
    ...args: string[]
): { success: boolean } => {
    const cmd = args.length > 0 ? `${command} ${args.join(' ')}` : command;
    const cc = getCompiler();
    process.env.FORCE_COLOR = 'true';
    process.env.CC = cc;
    process.env.CXX = cc;
    logger(`Executing: ${cmd}`);
    try {
        execSync(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'inherit', 'pipe'],
        });
        return { success: true };
    } catch (e) {
        if (
            typeof e === 'object' &&
            'stderr' in e &&
            'status' in e &&
            'pid' in e &&
            'signal' in e
        ) {
            const { stderr, signal, pid, status } = e;
            if (signal && pid) {
                output.error({
                    title: `[${signal}]: Killed ${cmd} (PID: ${pid})`,
                });
                return { success: false };
            }
            if (
                stderr !== undefined &&
                status !== undefined &&
                stderr !== null &&
                status !== null &&
                pid
            ) {
                output.error({
                    title: `[Process failed: ${cmd}] [Exit: ${status}]:`,
                    bodyLines: stderr.split('\n'),
                });
            }
            return { success: false };
        }
        if (e instanceof Error) {
            output.error({
                title: `Command failed: ${cmd}`,
                bodyLines: e.message.split('\n'),
            });
        }
        return { success: false };
    }
};
