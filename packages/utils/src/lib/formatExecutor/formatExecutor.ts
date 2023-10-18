import type { ExecutorContext } from '@nx/devkit';
import { FormatExecutorSchema } from '@/config';
import { formatFilesWithClangFormat } from '../formatFilesWithClangFormat/formatFilesWithClangFormat';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { logger } from '../logger/logger';

export async function* formatExecutor(
    options: FormatExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    logger(`Running fmt executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = formatFilesWithClangFormat(
        workspaceRoot,
        projectRoot,
        options,
    );
    yield {
        success,
    };
}
