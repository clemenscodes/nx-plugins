import type { BuildExecutorSchema } from './schema';
import type { ExecutorContext } from '@nx/devkit';
import { buildProjectWithCMake } from './utils/buildProjectWithCMake/buildProjectWithCMake';
import { extractRootsFromExecutorContext } from '@/utils';

export default async function* runExecutors(
    options: BuildExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = buildProjectWithCMake(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
}
