import type { BuildExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

export const buildProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: BuildExecutorSchema,
): boolean => {
    const buildCommand = checkCommandExists('cmake');
    const { args } = options;
    const { success } = runCommand(
        buildCommand,
        '--build',
        `${workspaceRoot}/dist/${projectRoot}`,
        ...args,
    );
    return success;
};
