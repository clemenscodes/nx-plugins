export const isWindows = (platform: typeof process.platform): boolean => {
    return platform === 'win32';
};
