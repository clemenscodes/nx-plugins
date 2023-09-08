import { CmakeExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { runCommand } from '../../utils/runCommand/runCommand';

export const cmakeExecutor = (
    options: CmakeExecutorSchema,
    ctx: ExecutorContext
): { success: boolean } => {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    const { release, args } = options;

    const { success } = runCommand(
        'cmake',
        '-S',
        `${workspaceRoot}/${root}`,
        `${workspaceRoot}/dist/${root}`,
        `-DCMAKE_BUILD_TYPE=${release ? 'Release' : 'Debug'}`,
        ...args
    );
    return { success };
};

export default async function* runExecutor(
    options: CmakeExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    yield cmakeExecutor(options, ctx);
}
