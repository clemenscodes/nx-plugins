import type { C, CTag } from '@/types';

export const getLanguageExtension = (l: C): CTag => (l === 'C' ? 'c' : 'cpp');
