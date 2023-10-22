import { getExecuteBinary } from '../getExecuteBinary/getExecuteBinary';
import { getBinaryArguments } from '../getBinaryArguments/getBinaryArguments';
import { ExecuteExecutorSchema } from '@/config';
import { runCommand } from '@/util';

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
