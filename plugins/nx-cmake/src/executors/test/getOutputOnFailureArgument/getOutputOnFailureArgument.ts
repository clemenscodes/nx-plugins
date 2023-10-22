export const getOutputOnFailureArgument = (
    outputOnFailure: boolean,
): string[] => {
    const outputOnFailureArgument = outputOnFailure
        ? ['--output-on-failure']
        : [];
    return outputOnFailureArgument;
};
