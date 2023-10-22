import type { Executor, LintExecutorSchema } from '@/config';
import { lintFilesWithClangTidy } from '../lintFilesWithClangTidy/lintFilesWithClangTidy';
import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';

export const lintExecutor: Executor<LintExecutorSchema> = async function* (
    options,
    ctx,
) {
    logger(`Running lint executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = lintFilesWithClangTidy(workspaceRoot, projectRoot, options);
    yield {
        success,
    };
};
