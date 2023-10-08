import { LintExecutorSchema } from '@/config';
import { ExecutorContext } from '@nx/devkit';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { lintFilesWithClangTidy } from '../lintFilesWithClangTidy/lintFilesWithClangTidy';

export async function* lintExecutor(
    options: LintExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
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
