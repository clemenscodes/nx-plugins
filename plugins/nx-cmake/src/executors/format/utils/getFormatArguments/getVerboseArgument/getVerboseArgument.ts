export const getVerboseArgument = (verbose: boolean): string[] => {
    return verbose ? ['--verbose'] : [];
};
