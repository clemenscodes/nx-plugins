import type { TestExecutorSchema } from './schema';
import type { ExecutorContext } from '@nx/devkit';
import { testBinaryWithCtest } from './utils/testBinaryWithCtest/testBinaryWithCtest';
import { extractRootsFromExecutorContext } from '@/utils';

export default async function* runExecutor(
    options: TestExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = testBinaryWithCtest(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
}
