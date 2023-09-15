import type { ExecutorContext } from '@nx/devkit';
import type { CmakeExecutorSchema } from './schema';
import { configureProjectWithCMake } from './utils/configureProjectWithCMake/configureProjectWithCMake';

export default async function* runExecutor(
    options: CmakeExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;
    const success = configureProjectWithCMake(
        workspaceRoot,
        projectRoot,
        options
    );
    yield { success };
}
