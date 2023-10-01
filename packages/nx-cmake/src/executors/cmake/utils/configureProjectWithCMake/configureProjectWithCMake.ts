import type { CmakeExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import { isWindows } from '../../../../utils/pluginUtils/isWindows/isWindows';

export const configureProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: CmakeExecutorSchema,
): boolean => {
    const cmakeCommand = checkCommandExists('cmake');
    const { release, args } = options;
    const { success } = runCommand(
        cmakeCommand,
        '-S',
        `${workspaceRoot}/${projectRoot}`,
        `${workspaceRoot}/dist/${projectRoot}`,
        ...(isWindows(process.platform) ? ['-G "MinGW Makefiles"'] : ['-G "Unix Makefiles"']),
        `-DCMAKE_BUILD_TYPE=${release ? 'Release' : 'Debug'}`,
        ...args,
    );
    return success;
};
