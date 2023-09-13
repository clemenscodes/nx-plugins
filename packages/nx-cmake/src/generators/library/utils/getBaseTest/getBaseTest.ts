import type { C } from '../../../../models/types';
import { getBaseCmockaTest } from '../getBaseCmockaTest/getBaseCmockaTest';
import { getBaseGoogleTest } from '../getBaseGoogleTest/getBaseGoogleTest';

export const getBaseTest = (
    generateTests: boolean,
    language: C,
    libName: string,
    projectName: string
) => {
    const baseGtest = getBaseGoogleTest(libName, projectName);
    const baseCmocka = getBaseCmockaTest(projectName);
    if (!generateTests) {
        return '';
    }
    return language === 'C++' ? baseGtest : baseCmocka;
};
