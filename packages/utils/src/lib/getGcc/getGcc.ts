import { getProgram } from '../getProgram/getProgram';
import { GCC } from '@/config';

export const getGcc = () => {
    const gcc = getProgram(GCC);
    return gcc;
};
