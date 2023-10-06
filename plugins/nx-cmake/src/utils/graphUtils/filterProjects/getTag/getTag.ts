import type { CTag } from '@/types';
import { isC } from '../isC/isC';

export const getTag = (tags: string[]): CTag => tags.find<CTag>(isC);
