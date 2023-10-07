import { LintExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { lintFilesWithClangTidy } from './utils/lintFilesWithClangTidy/lintFilesWithClangTidy';
import { extractRootsFromExecutorContext } from '@/utils';

export default async function* runExecutor(
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
