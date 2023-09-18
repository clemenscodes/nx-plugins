export const checkOs = (platform: typeof process.platform) => {
    if (platform === 'win32') {
        return false;
    }
    return true;
};
