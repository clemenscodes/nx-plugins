import { CMAKE } from '@/config';
import { getProgram } from '../getProgram/getProgram';

export const getCmake = (): string => {
    const program = getProgram(CMAKE);
    return program;
};
