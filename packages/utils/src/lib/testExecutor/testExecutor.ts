import { TestExecutorSchema } from '@/config';
import type { ExecutorContext } from '@nx/devkit';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { testBinaryWithCtest } from '../testBinaryWithCtest/testBinaryWithCtest';

export async function* testExecutor(
    options: TestExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = testBinaryWithCtest(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
}
