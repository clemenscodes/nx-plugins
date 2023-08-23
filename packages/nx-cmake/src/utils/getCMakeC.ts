import type { C } from '../models/types';

export const getCMakeC = (c: C) => (c === 'C' ? 'C' : 'CXX');
