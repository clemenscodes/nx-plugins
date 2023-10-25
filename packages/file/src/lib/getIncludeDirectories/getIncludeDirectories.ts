import { join } from 'path';
import { statSync, readdirSync } from 'fs';

export const getIncludeDirectories = (libsDir: string): string[] => {
    const includeDirectories: string[] = [];
    const files = readdirSync(libsDir);

    for (const file of files) {
        const filePath = join(libsDir, file);
        const stats = statSync(filePath);
        if (stats.isFile()) {
            continue;
        }
        if (file.toLowerCase() === 'include') {
            includeDirectories.push(filePath);
            continue;
        }
        includeDirectories.push(...getIncludeDirectories(filePath));
    }

    return includeDirectories;
};
