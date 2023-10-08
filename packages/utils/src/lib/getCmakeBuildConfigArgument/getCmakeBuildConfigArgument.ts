export const getCmakeBuildConfigArgument = (release: boolean) => {
    const config = release ? 'Release' : 'Debug';
    const configArgument = `--config=${config}`;
    return configArgument;
};
