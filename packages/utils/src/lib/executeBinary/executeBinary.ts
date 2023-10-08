import { getExecuteBinary } from '../getExecuteBinary/getExecuteBinary';
import { getBinaryArguments } from '../getBinaryArguments/getBinaryArguments';
import { ExecuteExecutorSchema } from '@/config';
import { runCommand } from '../runCommand/runCommand';

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
