import { ExecuteExecutorSchema } from '../../executors/executor';

export const getBinaryArguments = (
    options: ExecuteExecutorSchema,
): string[] => {
    const { args } = options;
    const binaryArguments = [...args];
    return binaryArguments;
};
