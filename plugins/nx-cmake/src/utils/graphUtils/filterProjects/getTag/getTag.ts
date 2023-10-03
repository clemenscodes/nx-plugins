import type { CTag } from '../../../../models/types';
import { isC } from '../isC/isC';

export const getTag = (tags: string[]): CTag => tags.find<CTag>(isC);
