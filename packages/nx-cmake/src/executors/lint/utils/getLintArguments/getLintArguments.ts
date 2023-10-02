import type { LintExecutorSchema } from '../../schema';
import { getClangTidyBuildPathArgument } from './getClangTidyBuildPathArgument/getClangTidyBuildPathArgument';
import { getClangTidyConfigArgument } from './getClangTidyConfigArgument/getClangTidyConfigArgument';
// import { isWindows } from '../../../../utils/pluginUtils/isWindows/isWindows';
// import { WINDOWS_CXX_INCLUDES, WINDOWS_C_INCLUDES } from '../../../../config/compiler';

// export const getClangIncludeArguments = (): string[] => {
//     const cxxSystemIncludes =WINDOWS_CXX_INCLUDES.map((include) => `--extra-arg=-I${include}`)
//     const cSystemIncludes = WINDOWS_C_INCLUDES.map((include) => `--extra-arg=-I${include}`)
//     const systemIncludeArg = isWindows(process.platform) ? [...cSystemIncludes, ...cxxSystemIncludes] : []
//     return systemIncludeArg
// }

export const getLintArguments = async (
    workspaceRoot: string,
    projectRoot: string,
    options: LintExecutorSchema,
): Promise<string[]> => {
    const { args } = options;
    const configArgument = await getClangTidyConfigArgument(
        workspaceRoot,
        projectRoot,
    );
    const buildArgument = getClangTidyBuildPathArgument(
        workspaceRoot,
        projectRoot,
    );
    // const includeArgument = getClangIncludeArguments()
    const lintCommandArguments = [configArgument, buildArgument, ...args];
    return lintCommandArguments;
};
