import { getCmakeCommandArguments } from '../getCmakeCommandArguments/getCmakeCommandArguments';
import { logger } from '@/log';
import { runCommand, checkCommandExists } from '@/util';
import { CmakeExecutorSchema, CMAKE, getCmake } from '../../config';

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
