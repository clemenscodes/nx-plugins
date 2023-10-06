import { readFileSync } from 'fs';
import { PROJECT_FILE } from '@/config';

export const readProjectFile = (projectFile: string): string => {
    if (!projectFile.endsWith(PROJECT_FILE)) {
        throw new Error('Invalid project file');
    }
    const fileContent = readFileSync(projectFile, {
        encoding: 'utf-8',
    });
    return fileContent;
};
