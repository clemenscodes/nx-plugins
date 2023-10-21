import { existsSync } from 'fs';

export const fileExists = (filePath: string): boolean => {
    return existsSync(filePath);
};
