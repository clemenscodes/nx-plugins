import { getProgram } from '../getProgram/getProgram';
import { CLANG_FORMAT } from '../getPrograms';

export const CLANG_FORMAT_CONFIG_FILE = '.clang-format';

export const getClangFormat = (): string => {
    const clangFormat = getProgram(CLANG_FORMAT);
    return clangFormat;
};
