import type { FormatExecutorSchema } from './schema';
import type { ExecutorContext } from '@nx/devkit';
import { formatFilesWithClangFormat } from './utils/formatFilesWithClangFormat/formatFilesWithClangFormat';
import { getProjectTypeFromConfig } from '../../utils/generatorUtils/getProjectTypeFromConfig/getProjectTypeFromConfig';

export default async function* runExecutor(
    options: FormatExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;
    const projectType = getProjectTypeFromConfig(project);

    const success = await formatFilesWithClangFormat(
        workspaceRoot,
        projectRoot,
        options,
        projectType,
    );

    yield {
        success,
    };
}
