import type { C } from '@/types';

export const getTestLib = (language: C) => {
    return language === 'C++' ? 'gtest' : 'cmocka';
};
