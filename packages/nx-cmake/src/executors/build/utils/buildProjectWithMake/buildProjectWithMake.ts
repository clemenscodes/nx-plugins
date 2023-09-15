import type { BuildExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

export const buildProjectWithMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: BuildExecutorSchema
): boolean => {
    const buildCommand = checkCommandExists('make');
    const { args } = options;
    const { success } = runCommand(
        buildCommand,
        '-C',
        `${workspaceRoot}/dist/${projectRoot}`,
        ...args
    );
    return success;
};
