import type { BuildExecutorSchema } from '../../schema';
import { getCmakeBuildConfigArgument } from '../getCmakeBuildConfigArgument/getCmakeBuildConfigArgument';
import { getCmakeBuildPathArgument } from '../getCmakeBuildPathArgument/getCmakeBuildPathArgument';

export const getCmakeBuildCommandArguments = (
    workspaceRoot: string,
    projectRoot: string,
    options: BuildExecutorSchema,
): string[] => {
    const { args, release } = options;
    const config = getCmakeBuildConfigArgument(release);
    const path = getCmakeBuildPathArgument(workspaceRoot, projectRoot);
    const cmakeBuildArguments = ['--build', path, config, ...args];
    return cmakeBuildArguments;
};