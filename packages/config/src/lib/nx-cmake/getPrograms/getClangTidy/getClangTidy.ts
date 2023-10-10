import { getProgram } from '../getProgram/getProgram';
import { CLANG_TIDY } from '../getPrograms';

export const getClangTidy = (): string => {
    const clangTidy = getProgram(CLANG_TIDY);
    return clangTidy;
};
