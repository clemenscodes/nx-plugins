import type { ExecutorContext } from '@nx/devkit';
import { BuildExecutorSchema } from '@/config';
import { buildProjectWithCMake } from '../buildProjectWithCMake/buildProjectWithCMake';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { logger } from '../logger/logger';

export async function* buildExecutor(
    options: BuildExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    logger(`Running build executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = buildProjectWithCMake(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
}
