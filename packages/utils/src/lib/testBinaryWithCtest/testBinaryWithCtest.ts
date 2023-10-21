import { checkCommandExists } from '../checkCommandExists/checkCommandExists';
import { getCtestArguments } from '../getCtestArguments/getCtestArguments';
import { CTEST, TestExecutorSchema, getCtest } from '@/config';
import { runCommandFromDirectory } from '../runCommandFromDirectory/runCommandFromDirectory';
import { join } from 'path';

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
