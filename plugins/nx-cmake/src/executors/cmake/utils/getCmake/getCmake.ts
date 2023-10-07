import { getProgram } from '@/utils';

export const getCmake = (): string => {
    const program = getProgram('cmake');
    return program;
};
