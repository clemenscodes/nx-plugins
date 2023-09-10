import { runCommand } from '../../utils/commandUtils/runCommand/runCommand';
import { BuildExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';

export default async function* runExecutor(
    options: BuildExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    const { args } = options;

    if (!args) {
        const { success } = runCommand(
            'make',
            '-C',
            `${workspaceRoot}/dist/${root}`
        );
        yield {
            success,
        };
        return;
    }

    const { success } = runCommand(
        'make',
        '-C',
        `${workspaceRoot}/dist/${root}`,
        ...args
    );

    yield {
        success,
    };
}
