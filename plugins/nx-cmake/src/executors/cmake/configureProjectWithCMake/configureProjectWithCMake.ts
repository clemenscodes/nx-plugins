import { getCmakeCommandArguments } from '../getCmakeCommandArguments/getCmakeCommandArguments';
import { logger } from '@/log';
import { runCommand, checkCommandExists } from '@/util';
import { CmakeExecutorSchema } from '../../executor';
import { CMAKE } from '../../../config/getPrograms/getPrograms';
import { getCmake } from '../../../config/getPrograms/getCmake/getCmake';

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
