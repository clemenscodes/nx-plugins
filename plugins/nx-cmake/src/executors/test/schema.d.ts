import type { ExecutorBaseOptions } from '../../models/types';

export type TestExecutorSchema = ExecutorBaseOptions & {
    outputOnFailure: boolean;
};
