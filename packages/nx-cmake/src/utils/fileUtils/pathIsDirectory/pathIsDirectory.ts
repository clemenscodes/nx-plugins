import { statSync } from 'fs';

export const pathIsDirectory = (path: string): boolean => {
    const isDirectory = statSync(path).isDirectory();
    return isDirectory;
};
