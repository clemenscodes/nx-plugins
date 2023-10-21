import { getProgram } from '../getProgram/getProgram';
import { GDB } from '../getPrograms';

export const getGdb = (): string => {
    const program = getProgram(GDB);
    return program;
};
