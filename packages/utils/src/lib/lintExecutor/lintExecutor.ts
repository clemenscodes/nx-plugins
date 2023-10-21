import type { Executor, LintExecutorSchema } from '@/config';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { lintFilesWithClangTidy } from '../lintFilesWithClangTidy/lintFilesWithClangTidy';
import { logger } from '../logger/logger';

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
