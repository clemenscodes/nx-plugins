import type { Executor, FormatExecutorSchema } from '@/config';
import { FMT_TARGET_NAME } from '@/config';
import { formatFilesWithClangFormat } from '../formatFilesWithClangFormat/formatFilesWithClangFormat';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { logger } from '../logger/logger';

export const fmtExecutor: Executor<FormatExecutorSchema> = async function* (
    options,
    ctx,
) {
    logger(`Running ${FMT_TARGET_NAME} executor`);
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
