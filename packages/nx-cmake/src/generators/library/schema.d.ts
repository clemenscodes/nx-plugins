import type { BaseOptions } from '../../models/base';

export interface LibGeneratorSchema extends BaseOptions {
    testLib: 'gtest' | 'cmocka';
    generateTests: boolean = true;
    setupTests: string;
    includeGoogleTest: 'include(GoogleTest)' | '';
    linkTestLib:
        | 'link_gtest(${CMAKE_PROJECT_NAME})'
        | 'link_cmocka(${CMAKE_PROJECT_NAME})'
        | '';
}
