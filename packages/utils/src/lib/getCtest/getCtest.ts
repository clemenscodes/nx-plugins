import { CTEST } from '@/config';
import { getProgram } from '../getProgram/getProgram';

export const getCtest = (): string => {
    const ctest = getProgram(CTEST);
    return ctest;
};
