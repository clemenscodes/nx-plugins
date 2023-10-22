import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { FormatExecutorSchema, FMT_TARGET_NAME, Executor } from '../../config';
import { formatFilesWithClangFormat } from '../../utils/formatFilesWithClangFormat/formatFilesWithClangFormat';

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

export default fmtExecutor;
