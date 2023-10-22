import { getProgram } from '../getProgram/getProgram';
import { GCC } from '../getPrograms';

export const getGcc = () => {
    const gcc = getProgram(GCC);
    return gcc;
};
