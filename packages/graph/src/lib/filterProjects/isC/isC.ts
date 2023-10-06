import type { CTag } from '@/types';

export const isC = (s: string): s is CTag => s === 'c' || s === 'cpp';
