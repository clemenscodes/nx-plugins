import { TestExecutorSchema } from '@/config';
import type { ExecutorContext } from '@nx/devkit';
import { testBinaryWithCtest } from '../testBinaryWithCtest/testBinaryWithCtest';
import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';

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
