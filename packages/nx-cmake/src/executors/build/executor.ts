import { BuildExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { runCommand } from '../../utils/runCommand';

export default async function* runExecutor(
    options: BuildExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    const { args } = options;

    if (!args) {
        const { success } = await runCommand(
            'make',
            '-C',
            `${workspaceRoot}/dist/${root}`
        );
        yield {
            success,
        };
        return;
    }

    const { success } = await runCommand(
        'make',
        '-C',
        `${workspaceRoot}/dist/${root}`,
        ...args
    );

    yield {
        success,
    };
}
