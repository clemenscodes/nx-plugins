import { getCtestArguments } from '../getCtestArguments/getCtestArguments';
import { CTEST, TestExecutorSchema, getCtest } from '@/config';
import { join } from 'path';
import { checkCommandExists, runCommandFromDirectory } from '@/util';

export const testBinaryWithCtest = (
    workspaceRoot: string,
    projectRoot: string,
    options: TestExecutorSchema,
): boolean => {
    checkCommandExists(CTEST);
    const ctest = getCtest();
    const ctestArguments = getCtestArguments(options);
    const directory = join(workspaceRoot, 'dist', projectRoot);
    const { success } = runCommandFromDirectory(
        ctest,
        directory,
        ...ctestArguments,
    );
    return success;
};
