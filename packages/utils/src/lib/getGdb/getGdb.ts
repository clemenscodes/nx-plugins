import { GDB } from '@/config';
import { getProgram } from '../getProgram/getProgram';

export const getGdb = (): string => {
    const program = getProgram(GDB);
    return program;
};
