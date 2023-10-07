import { ExecuteExecutorSchema } from '../../schema';

export const getBinaryArguments = (
    options: ExecuteExecutorSchema,
): string[] => {
    const { args } = options;
    const binaryArguments = [...args];
    return binaryArguments;
};
