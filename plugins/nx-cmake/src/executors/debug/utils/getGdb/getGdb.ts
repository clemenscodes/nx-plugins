import { getProgram } from '@/utils';

export const getGdb = (): string => {
    const program = getProgram('gdb');
    return program;
};
