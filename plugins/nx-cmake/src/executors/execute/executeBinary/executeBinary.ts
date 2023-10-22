import { getExecuteBinary } from '../getExecuteBinary/getExecuteBinary';
import { getBinaryArguments } from '../getBinaryArguments/getBinaryArguments';
import { runCommand } from '@/util';
import { ExecuteExecutorSchema } from '../../executor';

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
