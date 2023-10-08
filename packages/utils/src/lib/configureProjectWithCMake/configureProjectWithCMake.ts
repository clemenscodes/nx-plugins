import type { CmakeExecutorSchema } from '@/config';
import { getCmakeCommandArguments } from '../getCmakeCommandArguments/getCmakeCommandArguments';
import { getCmake } from '../getCmake/getCmake';
import { CMAKE } from '@/config';
import { checkCommandExists } from '../checkCommandExists/checkCommandExists';
import { runCommand } from '../runCommand/runCommand';

export const configureProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: CmakeExecutorSchema,
): boolean => {
    checkCommandExists(CMAKE);
    const cmake = getCmake();
    const cmakeArguments = getCmakeCommandArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const { success } = runCommand(cmake, ...cmakeArguments);
    return success;
};
