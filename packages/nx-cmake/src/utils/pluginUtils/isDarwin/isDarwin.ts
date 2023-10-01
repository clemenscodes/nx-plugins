export const isDarwin = (platform: typeof process.platform): boolean => {
    return platform === 'darwin';
};
