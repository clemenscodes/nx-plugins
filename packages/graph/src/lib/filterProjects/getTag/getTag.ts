import type { CTag } from '@/types';
import { isC } from '../isC/isC';

export const getTag = (tags: string[] | undefined): CTag => {
    if (!tags) {
        throw new Error(`No tags were defined in project.json`);
    }
    const tag = tags.find<CTag>(isC);
    if (!tag) {
        throw new Error(`No c or cpp tag was defined in project.json`);
    }
    return tag;
};
