import type { C, CTag } from '@/config';

export const getLanguageExtension = (l: C): CTag => (l === 'C' ? 'c' : 'cpp');
