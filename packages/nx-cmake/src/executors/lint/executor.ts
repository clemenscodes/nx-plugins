import { runCommand } from '../../utils/commandUtils/runCommand/runCommand';
import { LintExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';

export default async function* runExecutor(
    options: LintExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    console.log({ root, workspaceRoot });
    const { args } = options;

    const { success } = runCommand('clang-tidy', ...args);

    yield {
        success,
    };
}
