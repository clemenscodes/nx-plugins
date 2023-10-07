import { CmakeExecutorSchema } from '../../schema';
import { getGcc, isWindows } from '@/utils';
import { WINDOWS_MAKE } from '@/config';

export const getCmakeCommandArguments = (
    workspaceRoot: string,
    projectRoot: string,
    options: CmakeExecutorSchema,
): string[] => {
    const { release, args } = options;
    const gcc = getGcc();
    const cmakeArguments = [
        '-S',
        `${workspaceRoot}/${projectRoot}`,
        `${workspaceRoot}/dist/${projectRoot}`,
        ...(isWindows(process.platform)
            ? ['-G "MinGW Makefiles"']
            : ['-G "Unix Makefiles"']),
        ...(isWindows(process.platform)
            ? [`-DCMAKE_MAKE_PROGRAM=${WINDOWS_MAKE}`]
            : []),
        `-DCMAKE_C_COMPILER=${gcc}`,
        `-DCMAKE_CXX_COMPILER=${gcc}`,
        `-DCMAKE_BUILD_TYPE=${release ? 'Release' : 'Debug'}`,
        ...args,
    ];
    return cmakeArguments;
};
