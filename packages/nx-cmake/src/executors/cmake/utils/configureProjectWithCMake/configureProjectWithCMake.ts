import type { CmakeExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import { getCmakeCommandArguments } from '../getCmakeCommandArguments/getCmakeCommandArguments';
import { getCmake } from '../getCmake/getCmake';

export const configureProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: CmakeExecutorSchema,
): boolean => {
    const cmake = getCmake();
    const cmakeCommand = checkCommandExists(cmake);
    const cmakeArguments = getCmakeCommandArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const { success } = runCommand(cmakeCommand, ...cmakeArguments);
    return success;
};
