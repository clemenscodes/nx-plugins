import { Executor as NxExecutor } from '@nx/devkit';

export type Executor<T extends ExecutorBaseOptions = ExecutorBaseOptions> =
    NxExecutor<T>;

export type ExecutorBaseOptions = {
    args: string[];
};

export type CmakeExecutorSchema = ExecutorBaseOptions & {
    release: boolean;
};

export type BuildExecutorSchema = ExecutorBaseOptions & {
    release: boolean;
};

export type FormatExecutorSchema = ExecutorBaseOptions & {
    verbose: boolean;
    editFilesInPlace: boolean;
};

export type LintExecutorSchema = ExecutorBaseOptions & {
    release: boolean;
};

export type TestExecutorSchema = ExecutorBaseOptions & {
    release: boolean;
    outputOnFailure: boolean;
};

export type DebugExecutorSchema = ExecutorBaseOptions & {
    release: boolean;
};

export type ExecuteExecutorSchema = ExecutorBaseOptions & {
    release: boolean;
};
