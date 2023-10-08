import type { ExecutorContext } from '@nx/devkit';
import { FormatExecutorSchema } from '@/config';
import { formatFilesWithClangFormat } from '../formatFilesWithClangFormat/formatFilesWithClangFormat';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';

export async function* formatExecutor(
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
