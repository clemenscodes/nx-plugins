import type { ExecuteExecutorSchema, Executor } from '@/config';
import { executeBinary } from '../executeBinary/executeBinary';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { logger } from '../logger/logger';

export const executeExecutor: Executor<ExecuteExecutorSchema> =
    async function* (options, ctx) {
        logger(`Running execute executor`);
        const { workspaceRoot, projectRoot } =
            extractRootsFromExecutorContext(ctx);
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
    };
