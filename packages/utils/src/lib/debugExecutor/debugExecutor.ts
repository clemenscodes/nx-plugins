import type { ExecutorContext } from '@nx/devkit';
import { DebugExecutorSchema } from '@/config';
import { debugBinaryWithGdb } from '../debugBinaryWithGdb/debugBinaryWithGdb';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';

export async function* debugExecutor(
    options: DebugExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const { projectName } = ctx;
    if (!projectName) {
        throw new Error('Failed to get project name');
    }
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
