import type { Executor, FormatExecutorSchema } from '@/config';
import { formatFilesWithClangFormat } from '../formatFilesWithClangFormat/formatFilesWithClangFormat';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { logger } from '../logger/logger';

export const formatExecutor: Executor<FormatExecutorSchema> = async function* (
    options,
    ctx,
) {
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
};
