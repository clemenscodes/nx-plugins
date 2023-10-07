import { CLANG_FORMAT } from '@/config';
import { getProgram } from '@/utils';

export const getClangFormat = (): string => {
    const clangFormat = getProgram(CLANG_FORMAT);
    return clangFormat;
};
