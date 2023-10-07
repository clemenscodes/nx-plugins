import { TestExecutorSchema } from '../../schema';
import { getCtestConfigArgument } from '../getCtestConfigArgument/getCtestConfigArgument';
import { getOutputOnFailureArgument } from '../getOutputOnFailureArgument/getOutputOnFailureArgument';
import { getTestDirArgument } from '../getTestDirArgument/getTestDirArgument';

export const getCtestArguments = (
    workspaceRoot: string,
    projectRoot: string,
    options: TestExecutorSchema,
): string[] => {
    const { args, release, outputOnFailure } = options;
    const configArgument = getCtestConfigArgument(release);
    const outputOnFailureArgument = getOutputOnFailureArgument(outputOnFailure);
    const testDirArgument = getTestDirArgument(workspaceRoot, projectRoot);
    const ctestArguments = [
        configArgument,
        ...outputOnFailureArgument,
        testDirArgument,
        ...args,
    ];
    return ctestArguments;
};
