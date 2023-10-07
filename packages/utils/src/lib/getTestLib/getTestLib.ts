import type { C } from '@/config';

export const getTestLib = (language: C) => {
    return language === 'C++' ? 'gtest' : 'cmocka';
};
