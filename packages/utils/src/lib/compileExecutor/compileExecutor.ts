import type { CompileExecutorSchema, Executor } from '@/config';
import { compileProjectWithCMake } from '../compileProjectWithCMake/compileProjectWithCMake';
import { logger } from '@/log';
import { extractRootsFromExecutorContext } from '@/util';

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
