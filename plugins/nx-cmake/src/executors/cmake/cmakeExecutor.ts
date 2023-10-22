import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { CmakeExecutorSchema, Executor } from '../../config';
import { configureProjectWithCMake } from '../../utils/configureProjectWithCMake/configureProjectWithCMake';

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
