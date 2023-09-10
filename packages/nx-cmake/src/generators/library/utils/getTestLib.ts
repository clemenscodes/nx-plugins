import type { C } from '../../../models/types';

export const getTestLib = (language: C) => {
    return language === 'C++' ? 'gtest' : 'cmocka';
};
