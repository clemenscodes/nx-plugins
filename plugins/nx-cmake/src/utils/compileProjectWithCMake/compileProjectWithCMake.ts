import { CMAKE, getCmake } from '../../config';
import { CompileExecutorSchema } from '../../executors/executor';
import { getCmakeBuildCommandArguments } from '../getCmakeBuildCommandArguments/getCmakeBuildCommandArguments';
import { runCommand, checkCommandExists } from '@/util';

export const compileProjectWithCMake = (
    workspaceRoot: string,
    projectRoot: string,
    options: CompileExecutorSchema,
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
