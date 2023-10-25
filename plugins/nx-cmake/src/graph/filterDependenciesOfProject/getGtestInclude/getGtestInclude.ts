export const getGtestInclude = (libsDir: string): string => {
    const gtestInclude = `dist/${libsDir}/gtest/googletest-src/googletest/include`;
    return gtestInclude;
};
