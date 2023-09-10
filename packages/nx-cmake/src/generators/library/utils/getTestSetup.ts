import { C } from '../../../models/types';

export const getTestSetup = (
    generateTests: boolean,
    language: C,
    testName: string
) => {
    return generateTests && language === 'C'
        ? `add_test(UnitTests ${testName})`
        : `gtest_discover_tests(${testName})`;
};
