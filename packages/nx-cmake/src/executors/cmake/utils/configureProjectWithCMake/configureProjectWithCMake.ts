import type { CmakeExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

export const configureProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: CmakeExecutorSchema
): boolean => {
    const cmakeCommand = checkCommandExists('cmake');
    const { release, args } = options;
    const { success } = runCommand(
        cmakeCommand,
        '-S',
        `${workspaceRoot}/${projectRoot}`,
        `${workspaceRoot}/dist/${projectRoot}`,
        `-DCMAKE_BUILD_TYPE=${release ? 'Release' : 'Debug'}`,
        ...args
    );
    return success;
};
