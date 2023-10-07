import { existsSync } from 'fs';

export const fileExists = (filePath: string): boolean => {
    try {
        return existsSync(filePath);
    } catch (err) {
        return false;
    }
};
