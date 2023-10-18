import { C } from '../../../misc';

export const getCmakeC = (c: C) => (c === 'C' ? 'C' : 'CXX');
