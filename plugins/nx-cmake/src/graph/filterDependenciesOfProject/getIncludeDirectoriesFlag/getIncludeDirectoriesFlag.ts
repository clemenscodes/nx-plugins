import { getIncludeDirectories } from '@/file';

export const getIncludeDirectoriesFlag = (libsDir: string): string => {
    const includeDirectories = getIncludeDirectories(libsDir);
    const includeDirectoriesFlag = includeDirectories
        .map((include) => `-I ${include}`)
        .join(' ');
    return includeDirectoriesFlag;
};
