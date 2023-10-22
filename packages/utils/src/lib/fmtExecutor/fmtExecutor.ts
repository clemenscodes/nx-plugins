import type { Executor, FormatExecutorSchema } from '@/config';
import { FMT_TARGET_NAME } from '@/config';
import { formatFilesWithClangFormat } from '../formatFilesWithClangFormat/formatFilesWithClangFormat';
import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';

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
