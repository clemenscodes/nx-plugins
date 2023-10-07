import { CTEST } from '@/config';
import { getProgram } from '@/utils';

export const getCtest = (): string => {
    const ctest = getProgram(CTEST);
    return ctest;
};
