import { CLANG_FORMAT } from '@/config';
import { getProgram } from '../getProgram/getProgram';

export const getClangFormat = (): string => {
    const clangFormat = getProgram(CLANG_FORMAT);
    return clangFormat;
};
