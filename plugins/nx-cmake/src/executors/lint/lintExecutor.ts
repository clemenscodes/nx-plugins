import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { lintFilesWithClangTidy } from '../../utils/lintFilesWithClangTidy/lintFilesWithClangTidy';
import { Executor } from '@nx/devkit';
import { LintExecutorSchema } from '../executor';

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

export default lintExecutor;
