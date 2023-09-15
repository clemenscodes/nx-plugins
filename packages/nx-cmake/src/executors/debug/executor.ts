import type { ExecutorContext } from '@nx/devkit';
import type { DebugExecutorSchema } from './schema';
import { trimLib } from '../../utils/generatorUtils/trimLib/trimLib';
import { debugBinaryWithGDB } from './utils/debugBinaryWithGDB/debugBinaryWithGDB';

export default async function* runExecutor(
    options: DebugExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;
    const name = trimLib(projectName);

    const success = debugBinaryWithGDB(
        workspaceRoot,
        projectRoot,
        name,
        options
    );

    yield {
        success,
    };
}
