import { GDB } from '@/config';
import { getProgram } from '@/utils';

export const getGdb = (): string => {
    const program = getProgram(GDB);
    return program;
};
