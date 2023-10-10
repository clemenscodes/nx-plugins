import { getProgram } from '../getProgram/getProgram';
import { CLANG_FORMAT } from '../getPrograms';

export const getClangFormat = (): string => {
    const clangFormat = getProgram(CLANG_FORMAT);
    return clangFormat;
};
