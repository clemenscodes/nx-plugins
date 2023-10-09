import { checkCommandExists } from '../checkCommandExists/checkCommandExists';
import { getCtest } from '../getCtest/getCtest';
import { getCtestArguments } from '../getCtestArguments/getCtestArguments';
import { CTEST, TestExecutorSchema } from '@/config';
import { runCommand } from '../runCommand/runCommand';

export const testBinaryWithCtest = (
    workspaceRoot: string,
    projectRoot: string,
    options: TestExecutorSchema,
): boolean => {
    checkCommandExists(CTEST);
    const ctest = getCtest();
    const ctestArguments = getCtestArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const { success } = runCommand(ctest, ...ctestArguments);
    return success;
};