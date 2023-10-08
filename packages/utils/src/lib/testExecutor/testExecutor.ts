import { TestExecutorSchema } from '@/config';
import type { ExecutorContext } from '@nx/devkit';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { testBinaryWithCtest } from '../testBinaryWithCtest/testBinaryWithCtest';
import { logger } from '../logger/logger';

export async function* testExecutor(
    options: TestExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    logger(`Running test executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = testBinaryWithCtest(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
}
