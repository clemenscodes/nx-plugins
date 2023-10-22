import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { testBinaryWithCtest } from '../../utils/testBinaryWithCtest/testBinaryWithCtest';
import { Executor } from '@nx/devkit';
import { TestExecutorSchema } from '../executor';

export const testExecutor: Executor<TestExecutorSchema> = async function* (
    options,
    ctx,
) {
    logger(`Running test executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = testBinaryWithCtest(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
};

export default testExecutor;
