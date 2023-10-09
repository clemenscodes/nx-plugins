import { ExecuteExecutorSchema } from '@/config';

export const getBinaryArguments = (
    options: ExecuteExecutorSchema,
): string[] => {
    const { args } = options;
    const binaryArguments = [...args];
    return binaryArguments;
};