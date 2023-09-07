import type { BaseOptions } from '../../models/base';

export interface LibGeneratorSchema extends BaseOptions {
    testLib: 'gtest' | 'cmocka';
    generateTests: boolean = true;
    setupTests: string;
    includeGoogleTest: 'include(GoogleTest)' | '';
    baseTest: string
}
