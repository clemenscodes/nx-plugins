import type { C, CTag } from '../../../models/types';

export const getLanguageExtension = (l: C): CTag => (l === 'C' ? 'c' : 'cpp');
