import type { ExecutorContext } from '@nx/devkit';
import type { DebugExecutorSchema } from './schema';
import { extractRootsFromExecutorContext } from '@/utils';
import { debugBinaryWithGdb } from './utils/debugBinaryWithGdb/debugBinaryWithGdb';

export default async function* runExecutor(
    options: DebugExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const { projectName } = ctx;
    const success = debugBinaryWithGdb(
        workspaceRoot,
        projectRoot,
        projectName,
        options,
    );
    yield {
        success,
    };
}
