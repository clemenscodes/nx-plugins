import { readFileSync } from 'fs';
import { logger } from '../logger/logger';

export const readFile = (file: string) => {
    logger(`Reading file ${file}`);
    try {
        const content = readFileSync(file, { encoding: 'utf-8' });
        return content;
    } catch (e) {
        throw new Error(`Failed to read file ${file}`);
    }
};
