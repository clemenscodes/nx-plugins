import type { ExecutorContext } from '@nx/devkit';
import { BuildExecutorSchema } from '@/config';
import { buildProjectWithCMake } from '../buildProjectWithCMake/buildProjectWithCMake';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';

export async function* buildExecutor(
    options: BuildExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = buildProjectWithCMake(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
}
