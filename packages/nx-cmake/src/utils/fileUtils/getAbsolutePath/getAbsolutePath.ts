import { join, normalize } from 'path';

export const getAbsolutePath = (directory: string, file: string) => {
    const absolutePath = join(directory, file);
    return normalize(absolutePath);
};
