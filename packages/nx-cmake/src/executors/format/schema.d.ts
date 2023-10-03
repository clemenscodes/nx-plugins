import type { ExecutorBaseOptions } from '../../models/types';

export type FormatExecutorSchema = Omit<ExecutorBaseOptions, 'release'> & {
    verbose: boolean;
    editFilesInPlace: boolean;
};
