import type { BuildExecutorSchema, Executor } from '@/config';
import { buildProjectWithCMake } from '../buildProjectWithCMake/buildProjectWithCMake';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { logger } from '../logger/logger';

export const buildExecutor: Executor<BuildExecutorSchema> = async function* (
    options,
    ctx,
) {
    logger(`Running build executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = buildProjectWithCMake(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
};
