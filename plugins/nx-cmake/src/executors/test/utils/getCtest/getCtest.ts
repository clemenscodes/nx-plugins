import { getProgram } from '@/utils';

export const getCtest = (): string => {
    const ctest = getProgram('ctest');
    return ctest;
};
