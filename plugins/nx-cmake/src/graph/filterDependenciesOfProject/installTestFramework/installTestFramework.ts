import { runCommand, executeCommand } from '@/util';
import { join } from 'path';

export const installTestFramework = (
    workspaceRoot: string,
    projectRoot: string,
    cmd: string,
) => {
    runCommand(
        'cmake',
        '-S',
        join(workspaceRoot, projectRoot),
        join(workspaceRoot, 'dist', projectRoot),
    );

    const stdout = executeCommand(cmd);

    if (!stdout) {
        throw Error(`Failed process dependencies`);
    }

    return stdout;
};
