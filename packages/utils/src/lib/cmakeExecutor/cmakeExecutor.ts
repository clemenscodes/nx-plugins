import type { CmakeExecutorSchema, Executor } from '@/config';
import { configureProjectWithCMake } from '../configureProjectWithCMake/configureProjectWithCMake';
import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';

export const cmakeExecutor: Executor<CmakeExecutorSchema> = async function* (
    options,
    ctx,
) {
    logger(`Running cmake executor`);
    const { workspaceRoot, projectRoot } = extractRootsFromExecutorContext(ctx);
    const success = configureProjectWithCMake(
        workspaceRoot,
        projectRoot,
        options,
    );
    yield { success };
};
