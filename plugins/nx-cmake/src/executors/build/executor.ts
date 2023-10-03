import type { BuildExecutorSchema } from './schema';
import type { ExecutorContext } from '@nx/devkit';
import { buildProjectWithCMake } from './utils/buildProjectWithCMake/buildProjectWithCMake';

export default async function* runExecutor(
    options: BuildExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;

    const success = buildProjectWithCMake(workspaceRoot, projectRoot, options);

    yield {
        success,
    };
}
