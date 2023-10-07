import type { CTag } from '@/config';

export const isC = (s: string): s is CTag => s === 'c' || s === 'cpp';
