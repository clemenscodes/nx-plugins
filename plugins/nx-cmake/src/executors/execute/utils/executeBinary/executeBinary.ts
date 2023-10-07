import type { ExecuteExecutorSchema } from '../../schema';
import { runCommand } from '@/command';
import { getExecuteBinary } from '../getExecuteBinary/getExecuteBinary';
import { getBinaryArguments } from '../getBinaryArguments/getBinaryArguments';

export const executeBinary = (
    workspaceRoot: string,
    projectRoot: string,
    projectName: string,
    options: ExecuteExecutorSchema,
): boolean => {
    const binary = getExecuteBinary(
        workspaceRoot,
        projectRoot,
        projectName,
        options,
    );
    const binaryArguments = getBinaryArguments(options);
    const { success } = runCommand(binary, ...binaryArguments);
    return success;
};
