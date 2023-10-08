import type { CmakeExecutorSchema } from '@/config';
import { getCmakeCommandArguments } from '../getCmakeCommandArguments/getCmakeCommandArguments';
import { getCmake } from '../getCmake/getCmake';
import { CMAKE } from '@/config';
import { checkCommandExists } from '../checkCommandExists/checkCommandExists';
import { runCommand } from '../runCommand/runCommand';
import { logger } from '../logger/logger';

export const configureProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: CmakeExecutorSchema,
): boolean => {
    logger(`Configuring project with cmake`);
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
