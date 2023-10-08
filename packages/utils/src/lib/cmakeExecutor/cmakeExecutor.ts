import type { CmakeExecutorSchema } from '@/config';
import type { ExecutorContext } from '@nx/devkit';
import { configureProjectWithCMake } from '../configureProjectWithCMake/configureProjectWithCMake';
import { extractRootsFromExecutorContext } from '../extractRootsFromExecutorContext/extractRootsFromExecutorContext';
import { logger } from '../logger/logger';

export async function* cmakeExecutor(
    options: CmakeExecutorSchema,
    ctx: ExecutorContext,
): AsyncGenerator<{ success: boolean }> {
    logger(`Running cmake executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = configureProjectWithCMake(
        workspaceRoot,
        projectRoot,
        options,
    );
    yield { success };
}
