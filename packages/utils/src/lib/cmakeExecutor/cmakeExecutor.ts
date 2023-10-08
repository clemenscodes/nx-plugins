import type { CmakeExecutorSchema } from '@/config';
import type { ExecutorContext } from '@nx/devkit';
import { configureProjectWithCMake } from '../configureProjectWithCMake/configureProjectWithCMake';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';

export async function* cmakeExecutor(
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
