import { getCmakeBuildCommandArguments } from '../getCmakeBuildCommandArguments/getCmakeBuildCommandArguments';
import { CompileExecutorSchema, CMAKE, getCmake } from '@/config';
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
