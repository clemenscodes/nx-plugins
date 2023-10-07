import type { ExecutorContext } from '@nx/devkit';
import type { CmakeExecutorSchema } from './schema';
import { configureProjectWithCMake } from './utils/configureProjectWithCMake/configureProjectWithCMake';
import { extractRootsFromExecutorContext } from '@/utils';

export default async function* runExecutor(
    options: CmakeExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = configureProjectWithCMake(
        workspaceRoot,
        projectRoot,
        options,
    );
    yield { success };
}
