import type { BaseOptions } from '../../models/types';

export type GoogleTestInclude = 'include(GoogleTest)' | '';

export type LibGeneratorSchema = BaseOptions & {
    generateTests: boolean;
};

export type LibOptions = Required<LibGeneratorSchema> & {
    testLib: 'gtest' | 'cmocka';
    setupTests: string;
    projectRoot: string;
    libName: string;
    testName: string;
    includeGoogleTest: GoogleTestInclude;
    baseTest: string;
};
