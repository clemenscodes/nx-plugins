import { getProjectTypeFromConfig } from '../../utils/generatorUtils/getProjectTypeFromConfig/getProjectTypeFromConfig';
import { LintExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { lintFilesWithClangTidy } from './utils/lintFilesWithClangTidy/lintFilesWithClangTidy';

export default async function* runExecutor(
    options: LintExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;
    const projectType = getProjectTypeFromConfig(project);

    const success = await lintFilesWithClangTidy(
        workspaceRoot,
        projectRoot,
        options,
        projectType,
    );

    yield {
        success,
    };
}
