import { getProgram } from '../getProgram/getProgram';
import { CTEST } from '../getPrograms';

export const getCtest = (): string => {
    const ctest = getProgram(CTEST);
    return ctest;
};
