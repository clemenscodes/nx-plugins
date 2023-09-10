import { runCommand } from '../../utils/commandUtils/runCommand/runCommand';
import { FormatExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';

export default async function* runExecutor(
    options: FormatExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    console.log({ root, workspaceRoot });
    const { args } = options;

    const { success } = runCommand('clang-format', ...args);

    yield {
        success,
    };
}
