import { checkCommandExists } from '../checkCommandExists/checkCommandExists';
import { getCmake } from '../getCmake/getCmake';
import { getCmakeBuildCommandArguments } from '../getCmakeBuildCommandArguments/getCmakeBuildCommandArguments';
import { BuildExecutorSchema, CMAKE } from '@/config';
import { runCommand } from '../runCommand/runCommand';

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
