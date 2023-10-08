export const getCmockaInclude = (libsDir: string): string => {
    const cmockaInclude = `dist/${libsDir}/cmocka/cmocka-src/include`;
    return cmockaInclude;
};
