import { getProgram } from '../getProgram/getProgram';
import { CLANG_TIDY } from '../getPrograms';

export const CLANG_TIDY_CONFIG_FILE = '.clang-tidy';

export const getClangTidy = (): string => {
    const clangTidy = getProgram(CLANG_TIDY);
    return clangTidy;
};
