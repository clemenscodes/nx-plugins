import type { GoogleTestInclude, C } from '@/types';

export const getGoogleTestInclude = (
    generateTests: boolean,
    language: C,
): GoogleTestInclude => {
    return generateTests && language === 'C++' ? 'include(GoogleTest)' : '';
};
