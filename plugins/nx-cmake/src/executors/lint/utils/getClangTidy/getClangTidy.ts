import { getProgram } from '@/utils';

export const getClangTidy = (): string => {
    const clangTidy = getProgram('clangTidy');
    return clangTidy;
};
