import { ExecutorContext } from '@nx/devkit';
import { ExecuteExecutorSchema } from './schema';
import { runCommand } from '../../utils/runCommand/runCommand';

export default async function* runExecutor(
    options: ExecuteExecutorSchema,
    ctx: ExecutorContext
) {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    const { args } = options;
    const bin = `${workspaceRoot}/dist/${root}/${projectName}`;

    const { success } = await runCommand(bin, ...args);

    yield {
        success,
    };
}
