import { CLANG_TIDY } from '@/config';
import { getProgram } from '../getProgram/getProgram';

export const getClangTidy = (): string => {
    const clangTidy = getProgram(CLANG_TIDY);
    return clangTidy;
};
