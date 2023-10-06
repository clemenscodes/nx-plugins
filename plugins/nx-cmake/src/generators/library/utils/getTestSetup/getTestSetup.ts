import type { C } from '@/types';

export const getTestSetup = (
    generateTests: boolean,
    language: C,
    testName: string,
) => {
    if (!generateTests) {
        return '';
    }
    return language === 'C'
        ? `add_test(UnitTests ${testName})`
        : `gtest_discover_tests(${testName})`;
};
