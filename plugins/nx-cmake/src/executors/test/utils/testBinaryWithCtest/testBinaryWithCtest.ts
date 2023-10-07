import type { TestExecutorSchema } from '../../schema';
import { runCommand, checkCommandExists } from '@/command';
import { getCtest } from '../getCtest/getCtest';
import { getCtestArguments } from '../getCtestArguments/getCtestArguments';

export const testBinaryWithCtest = (
    workspaceRoot: string,
    projectRoot: string,
    options: TestExecutorSchema,
): boolean => {
    checkCommandExists('ctest');
    const ctest = getCtest();
    const ctestArguments = getCtestArguments(
        workspaceRoot,
        projectRoot,
        options,
    );
    const { success } = runCommand(ctest, ...ctestArguments);
    return success;
};
