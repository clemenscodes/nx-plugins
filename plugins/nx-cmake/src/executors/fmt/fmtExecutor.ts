import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { formatFilesWithClangFormat } from '../../utils/formatFilesWithClangFormat/formatFilesWithClangFormat';
import { Executor } from '@nx/devkit';
import { FMT_TARGET_NAME } from '../../config';
import { FormatExecutorSchema } from '../executor';

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
