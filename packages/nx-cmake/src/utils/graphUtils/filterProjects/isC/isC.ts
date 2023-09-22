import type { CTag } from '../../../../models/types';

export const isC = (s: string): s is CTag => s === 'c' || s === 'cpp';
