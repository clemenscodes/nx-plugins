import { LintExecutorSchema } from '@/config';
import { ExecutorContext } from '@nx/devkit';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { lintFilesWithClangTidy } from '../lintFilesWithClangTidy/lintFilesWithClangTidy';
import { logger } from '../logger/logger';

export async function* lintExecutor(
    options: LintExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    logger(`Running lint executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = await lintFilesWithClangTidy(
        workspaceRoot,
        projectRoot,
        options,
    );
    yield {
        success,
    };
}
