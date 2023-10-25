import { runCommand, checkCommandExists } from '@/command';
import { CompileExecutorSchema } from '../../executor';
import { getCmakeBuildCommandArguments } from '../getCmakeBuildCommandArguments/getCmakeBuildCommandArguments';
import { CMAKE } from '../../../config/getPrograms/getPrograms';
import { getCmake } from '../../../config/getPrograms/getCmake/getCmake';

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
