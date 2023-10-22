import type { CmakeExecutorSchema } from '@/config';
import { getCmakeCommandArguments } from '../getCmakeCommandArguments/getCmakeCommandArguments';
import { CMAKE, getCmake } from '@/config';
import { logger } from '@/log';
import { runCommand, checkCommandExists } from '@/util';

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
