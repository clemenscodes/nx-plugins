export const getCtestConfigArgument = (release: boolean) => {
    const config = release ? 'Release' : 'Debug';
    const configArgument = `-C ${config}`;
    return configArgument;
};
