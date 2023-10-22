import { getProgram } from '../getProgram/getProgram';
import { CMAKE } from '../getPrograms';

export const getCmake = (): string => {
    const program = getProgram(CMAKE);
    return program;
};
