import { TestExecutorSchema } from '../../executor';
import { getCtestConfigArgument } from '../getCtestConfigArgument/getCtestConfigArgument';
import { getOutputOnFailureArgument } from '../getOutputOnFailureArgument/getOutputOnFailureArgument';

export const getCtestArguments = (options: TestExecutorSchema): string[] => {
    const { args, release, outputOnFailure } = options;
    const configArgument = getCtestConfigArgument(release);
    const outputOnFailureArgument = getOutputOnFailureArgument(outputOnFailure);
    const ctestArguments = [
        configArgument,
        ...outputOnFailureArgument,
        ...args,
    ];
    return ctestArguments;
};
