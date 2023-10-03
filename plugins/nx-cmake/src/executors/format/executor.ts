import type { FormatExecutorSchema } from './schema';
import type { ExecutorContext } from '@nx/devkit';
import { formatFilesWithClangFormat } from './utils/formatFilesWithClangFormat/formatFilesWithClangFormat';

export default async function* runExecutor(
    options: FormatExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;

    const success = await formatFilesWithClangFormat(
        workspaceRoot,
        projectRoot,
        options,
    );

    yield {
        success,
    };
}
