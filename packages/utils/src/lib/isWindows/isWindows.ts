export const isWindows = (platform: typeof process.platform): boolean => {
    console.log('im not mocked lool');
    return platform === 'win32';
};
