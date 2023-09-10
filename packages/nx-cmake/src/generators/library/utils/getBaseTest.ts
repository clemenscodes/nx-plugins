import type { C } from '../../../models/types';
import { getBaseCmockaTest } from './getBaseCmockaTest';
import { getBaseGoogleTest } from './getBaseGoogleTest';

export const getBaseTest = (
    generateTests: boolean,
    language: C,
    libName: string,
    projectName: string
) => {
    const baseGtest = getBaseGoogleTest(libName, projectName);
    const baseCmocka = getBaseCmockaTest(projectName);
    return generateTests && language === 'C++' ? baseGtest : baseCmocka;
};
