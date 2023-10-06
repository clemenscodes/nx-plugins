import type { C } from '@/types';

export const getCMakeC = (c: C) => (c === 'C' ? 'C' : 'CXX');
