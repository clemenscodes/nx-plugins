import { ExecutorBaseOptions } from '../../models/executorBase';

export type CmakeExecutorSchema = ExecutorBaseOptions & {
    release: boolean;
};
