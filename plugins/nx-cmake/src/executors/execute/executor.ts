import type { ExecutorContext } from '@nx/devkit';
import type { ExecuteExecutorSchema } from './schema';
import { executeBinary } from './utils/executeBinary/executeBinary';

export default async function* runExecutor(
    options: ExecuteExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;

    const success = executeBinary(
        workspaceRoot,
        projectRoot,
        projectName,
        options,
    );

    yield {
        success,
    };
}
