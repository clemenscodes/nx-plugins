import { C } from '@/types';

export const getCmakeC = (c: C) => (c === 'C' ? 'C' : 'CXX');
