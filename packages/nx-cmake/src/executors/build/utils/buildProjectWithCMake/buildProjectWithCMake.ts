import type { BuildExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { getCmake } from '../../../cmake/utils/getCmake/getCmake';

export const buildProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: BuildExecutorSchema,
): boolean => {
    const cmake = getCmake();
    const { args, release } = options;
    const config = release ? 'Release' : 'Debug';
    const { success } = runCommand(
        cmake,
        '--build',
        `${workspaceRoot}/dist/${projectRoot}`,
        `--config=${config}`,
        ...args,
    );
    return success;
};
