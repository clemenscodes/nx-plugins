import { FormatExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { runCommand } from '../../utils/runCommand';

export default async function* runExecutor(
    options: FormatExecutorSchema,
    ctx: ExecutorContext
) {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    const { args } = options;

    const { success } = await runCommand('clang-format', ...args);

    yield {
        success,
    };
}
