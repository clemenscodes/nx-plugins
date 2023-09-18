export const checkOs = (platform: typeof process.platform): boolean => {
    return platform !== 'win32';
};
