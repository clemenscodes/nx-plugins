import type { ExecutorContext } from '@nx/devkit';
import type { ExecuteExecutorSchema } from './schema';
import { executeBinary } from './utils/executeBinary/executeBinary';
import { extractRootsFromExecutorContext } from '@/utils';

export default async function* runExecutor(
    options: ExecuteExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const { projectName } = ctx;
    const success = executeBinary(
        workspaceRoot,
        projectRoot,
        projectName,
        options,
    );
    yield {
        success,
    };
}
