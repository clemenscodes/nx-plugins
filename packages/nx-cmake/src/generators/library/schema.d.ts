import type { BaseOptions } from '../../models/base';

export type GoogleTestInclude = 'include(GoogleTest)' | '';

export type LibGeneratorSchema = BaseOptions & {
    generateTests: boolean = true;
    testLib?: 'gtest' | 'cmocka';
    setupTests?: string;
    includeGoogleTest?: GoogleTestInclude;
    baseTest?: string;
};
