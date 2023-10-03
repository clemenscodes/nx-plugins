import type { CTag } from '../../../../models/types';

export const getFileName = (
    projectRoot: string,
    name: string,
    tag: CTag,
): string => {
    const fileName = `${projectRoot}/src/${name}.${tag}`;
    return fileName;
};
