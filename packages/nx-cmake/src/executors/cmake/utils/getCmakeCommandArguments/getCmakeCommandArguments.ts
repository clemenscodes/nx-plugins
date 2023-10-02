import { CmakeExecutorSchema } from '../../schema';
import { getCompiler } from '../../../../utils/pluginUtils/getCompiler/getCompiler';
import { isWindows } from '../../../../utils/pluginUtils/isWindows/isWindows';
import { WINDOWS_MAKE } from '../../../../config/compiler';

export const getCmakeCommandArguments = (
    workspaceRoot: string,
    projectRoot: string,
    options: CmakeExecutorSchema,
): string[] => {
    const { release, args } = options;
    const cc = getCompiler();
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
        `-DCMAKE_C_COMPILER=${cc}`,
        `-DCMAKE_CXX_COMPILER=${cc}`,
        `-DCMAKE_BUILD_TYPE=${release ? 'Release' : 'Debug'}`,
        ...args,
    ];
    return cmakeArguments;
};
