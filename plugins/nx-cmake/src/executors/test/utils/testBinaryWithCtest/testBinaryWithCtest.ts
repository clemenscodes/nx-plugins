import type { TestExecutorSchema } from '../../schema';
import { runCommand, checkCommandExists } from '@/command';

export const testBinaryWithCtest = (
    workspaceRoot: string,
    projectRoot: string,
    options: TestExecutorSchema,
): boolean => {
    const testCommand = checkCommandExists('ctest');
    const testBin = `${workspaceRoot}/dist/${projectRoot}`;
    const { args, release } = options;
    const config = release ? 'Release' : 'Debug';
    const { success } = runCommand(
        testCommand,
        `-C ${config}`,
        '--output-on-failure',
        '--test-dir',
        testBin,
        ...args,
    );
    return success;
};
