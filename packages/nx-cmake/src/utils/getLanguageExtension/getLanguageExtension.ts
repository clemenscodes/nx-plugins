import type { C } from '../../models/types';

export const getLanguageExtension = (l: C) => (l === 'C' ? 'c' : 'cpp');
