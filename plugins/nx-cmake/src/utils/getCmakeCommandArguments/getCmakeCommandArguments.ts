import { join } from 'path';
import { logger } from '@/log';
import { isWindows } from '@/util';
import { getGcc, getMake } from '../../config';
import { CmakeExecutorSchema } from '../../executors/executor';

export const getCmakeCommandArguments = (
    workspaceRoot: string,
    projectRoot: string,
    options: CmakeExecutorSchema,
): string[] => {
    logger(`Getting cmake command arguments`);
    const { release, args } = options;
    const gcc = getGcc();
    const make = getMake();
    const transformedGcc = gcc.replace(/\\/g, '/');
    const transformedMake = make.replace(/\\/g, '/');
    const cmakeArguments = [
        '-S',
        join(workspaceRoot, projectRoot),
        join(workspaceRoot, 'dist', projectRoot),
        ...(isWindows(process.platform)
            ? ['-G "MinGW Makefiles"']
            : ['-G "Unix Makefiles"']),
        ...(isWindows(process.platform)
            ? [`-DCMAKE_MAKE_PROGRAM=${transformedMake}`]
            : []),
        `-DCMAKE_C_COMPILER=${transformedGcc}`,
        `-DCMAKE_CXX_COMPILER=${transformedGcc}`,
        `-DCMAKE_BUILD_TYPE=${release ? 'Release' : 'Debug'}`,
        ...args,
    ];
    return cmakeArguments;
};
