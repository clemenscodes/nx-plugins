import { getProgram } from '@/utils';

export const getClangFormat = (): string => {
    const clangFormat = getProgram('clangFormat');
    return clangFormat;
};
