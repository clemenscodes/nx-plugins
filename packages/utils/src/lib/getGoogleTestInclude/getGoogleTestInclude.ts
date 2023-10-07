import type { GoogleTestInclude, C } from '@/config';

export const getGoogleTestInclude = (
    generateTests: boolean,
    language: C,
): GoogleTestInclude => {
    return generateTests && language === 'C++' ? 'include(GoogleTest)' : '';
};
