import type { CTag } from '@/types';

export const getFileName = (
    projectRoot: string,
    name: string,
    tag: CTag,
): string => {
    const fileName = `${projectRoot}/src/${name}.${tag}`;
    return fileName;
};
