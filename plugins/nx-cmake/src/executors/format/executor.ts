import type { FormatExecutorSchema } from './schema';
import type { ExecutorContext } from '@nx/devkit';
import { formatFilesWithClangFormat } from './utils/formatFilesWithClangFormat/formatFilesWithClangFormat';
import { extractRootsFromExecutorContext } from '@/utils';

export default async function* runExecutor(
    options: FormatExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = await formatFilesWithClangFormat(
        workspaceRoot,
        projectRoot,
        options,
    );
    yield {
        success,
    };
}
