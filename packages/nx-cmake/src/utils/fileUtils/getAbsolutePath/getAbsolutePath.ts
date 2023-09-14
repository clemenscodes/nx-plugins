import { join } from 'path';

export const getAbsolutePath = (directory: string, file: string) => {
    const absolutePath = join(directory, file);
    return absolutePath;
};
