import { CMAKE } from '@/config';
import { getProgram } from '@/utils';

export const getCmake = (): string => {
    const program = getProgram(CMAKE);
    return program;
};
