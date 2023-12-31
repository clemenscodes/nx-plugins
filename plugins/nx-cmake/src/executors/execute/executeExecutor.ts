import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { Executor } from '@nx/devkit';
import { ExecuteExecutorSchema } from '../executor';
import { executeBinary } from './executeBinary/executeBinary';

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

export default executeExecutor;
