import type { TestExecutorSchema } from '../../schema';
import { runCommand } from '../../../../utils/commandUtils/runCommand/runCommand';
import { checkCommandExists } from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

export const testBinaryWithCtest = (
    workspaceRoot: string,
    projectRoot: string,
    options: TestExecutorSchema
): boolean => {
    const testCommand = checkCommandExists('ctest');
    const testBin = `${workspaceRoot}/dist/${projectRoot}`;
    const { args } = options;
    const { success } = runCommand(testCommand, '--test-dir', testBin, ...args);
    return success;
};
