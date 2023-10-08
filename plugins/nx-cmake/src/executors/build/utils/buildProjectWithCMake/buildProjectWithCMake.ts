import type { BuildExecutorSchema } from '../../schema';
import { checkCommandExists, runCommand } from '@/command';
import { getCmake } from '../../../cmake/utils/getCmake/getCmake';
import { getCmakeBuildCommandArguments } from '../getCmakeBuildCommandArguments/getCmakeBuildCommandArguments';
import { CMAKE } from '@/config';

export const buildProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: BuildExecutorSchema,
): boolean => {
    checkCommandExists(CMAKE);
    const cmake = getCmake();
    const buildCommandArguments = getCmakeBuildCommandArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const { success } = runCommand(cmake, ...buildCommandArguments);
    return success;
};
