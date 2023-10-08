import { MAKE } from '@/config';
import { getProgram } from '../getProgram/getProgram';

export const getMake = (): string => {
    const program = getProgram(MAKE);
    return program;
};
