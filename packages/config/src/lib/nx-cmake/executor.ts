export type ExecutorBaseOptions = {
    args: string[];
    release: boolean;
};

export type CmakeExecutorSchema = ExecutorBaseOptions;

export type BuildExecutorSchema = ExecutorBaseOptions;

export type FormatExecutorSchema = Omit<ExecutorBaseOptions, 'release'> & {
    verbose: boolean;
    editFilesInPlace: boolean;
};

export type LintExecutorSchema = ExecutorBaseOptions;

export type TestExecutorSchema = ExecutorBaseOptions & {
    outputOnFailure: boolean;
};

export type DebugExecutorSchema = ExecutorBaseOptions;

export type ExecuteExecutorSchema = ExecutorBaseOptions;
