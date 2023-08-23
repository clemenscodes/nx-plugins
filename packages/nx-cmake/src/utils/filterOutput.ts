export const filterOutput = (output: string): string[] => {
    const filteredOutput = output
        .split(' ')
        .filter(
            (line) =>
                /\.(h|c|cpp)/.test(line) &&
                !line.includes('.o') &&
                !line.includes('/usr/include') &&
                !line.includes('/usr/lib')
        )
        .map((line) => line.trim());
    return filteredOutput;
};
