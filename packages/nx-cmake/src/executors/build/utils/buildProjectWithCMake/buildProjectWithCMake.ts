import type { BuildExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

export const buildProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: BuildExecutorSchema,
): boolean => {
    const buildCommand = checkCommandExists('cmake');
    const { args, release } = options;
    const config = release ? 'Release' : 'Debug';
    const { success } = runCommand(
        buildCommand,
        '--build',
        `${workspaceRoot}/dist/${projectRoot}`,
        `--config=${config}`,
        ...args,
    );
    return success;
};
