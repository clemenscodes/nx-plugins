import type { BaseOptions } from '../../models/base';

export type GoogleTestInclude = 'include(GoogleTest)' | '';

export interface LibGeneratorSchema extends BaseOptions {
    testLib: 'gtest' | 'cmocka';
    generateTests: boolean = true;
    setupTests: string;
    includeGoogleTest: GoogleTestInclude;
    baseTest: string;
}
