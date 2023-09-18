import type { ExecutorBaseOptions } from '../../models/types';

export type FormatExecutorSchema = ExecutorBaseOptions & {
    verbose: boolean;
    editFilesInPlace: boolean;
};
