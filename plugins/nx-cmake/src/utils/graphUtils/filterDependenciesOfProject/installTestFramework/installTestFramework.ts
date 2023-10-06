import { runCommand, executeCommand } from '@/command';

export const installTestFramework = (
    workspaceRoot: string,
    projectRoot: string,
    cmd: string,
) => {
    runCommand(
        'cmake',
        '-S',
        `${workspaceRoot}/${projectRoot}`,
        `${workspaceRoot}/dist/${projectRoot}`,
    );

    const stdout = executeCommand(cmd);

    if (!stdout) {
        throw Error(`Failed process dependencies`);
    }

    return stdout;
};
