import { getProgram } from '../getProgram/getProgram';
import { MAKE } from '../getPrograms';

export const getMake = (): string => {
    const program = getProgram(MAKE);
    return program;
};
