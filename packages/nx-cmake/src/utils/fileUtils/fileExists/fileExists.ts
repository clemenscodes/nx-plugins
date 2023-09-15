import { promises as fsPromises } from 'fs';

export const fileExists = async (filePath: string): Promise<boolean> => {
    try {
        await fsPromises.access(filePath);
        return true;
    } catch (err) {
        return false;
    }
};
