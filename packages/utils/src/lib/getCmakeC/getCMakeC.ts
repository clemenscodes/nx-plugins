import type { C } from '@/config';

export const getCMakeC = (c: C) => (c === 'C' ? 'C' : 'CXX');
