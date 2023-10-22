import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { configureProjectWithCMake } from '../../utils/configureProjectWithCMake/configureProjectWithCMake';
import { Executor } from '@nx/devkit';
import { CmakeExecutorSchema } from '../executor';

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
