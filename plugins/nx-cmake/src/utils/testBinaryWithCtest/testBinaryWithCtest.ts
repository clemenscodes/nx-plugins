import { getCtestArguments } from '../getCtestArguments/getCtestArguments';
import { join } from 'path';
import { checkCommandExists, runCommandFromDirectory } from '@/util';
import { CTEST, getCtest } from '../../config';
import { TestExecutorSchema } from '../../executors/executor';

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
