import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';
import { compileProjectWithCMake } from '../../utils/compileProjectWithCMake/compileProjectWithCMake';
import { Executor } from '@nx/devkit';
import { CompileExecutorSchema } from '../executor';

export const compileExecutor: Executor<CompileExecutorSchema> =
    async function* (options, ctx) {
        logger(`Running build executor`);
        const { workspaceRoot, projectRoot } =
            extractRootsFromExecutorContext(ctx);
        const success = compileProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        yield {
            success,
        };
    };

export default compileExecutor;
