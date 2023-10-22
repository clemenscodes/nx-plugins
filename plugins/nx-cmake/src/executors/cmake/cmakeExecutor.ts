import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { Executor } from '@nx/devkit';
import { CmakeExecutorSchema } from '../executor';
import { configureProjectWithCMake } from './configureProjectWithCMake/configureProjectWithCMake';

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

export default cmakeExecutor;
