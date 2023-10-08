import type { ExecutorContext } from '@nx/devkit';
import { ExecuteExecutorSchema } from '@/config';
import { executeBinary } from '../executeBinary/executeBinary';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { logger } from '../logger/logger';

export async function* executeExecutor(
    options: ExecuteExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    logger(`Running execute executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const { projectName } = ctx;
    if (!projectName) {
        throw new Error('Failed to get project name');
    }
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
