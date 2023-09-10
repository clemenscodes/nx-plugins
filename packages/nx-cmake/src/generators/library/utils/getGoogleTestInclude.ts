import type { C } from '../../../models/types';
import type { GoogleTestInclude } from '../schema';

export const getGoogleTestInclude = (
    generateTests: boolean,
    language: C
): GoogleTestInclude => {
    return generateTests && language === 'C++' ? 'include(GoogleTest)' : '';
};
