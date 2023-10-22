import type { CTag } from '@/types';

export const hasValidExtension = (file: string, tag: CTag): boolean => {
    const isCFile = file.endsWith('.c');
    const isCppFile =
        file.endsWith('.cpp') || file.endsWith('.cxx') || file.endsWith('.cc');
    const isHFile = file.endsWith('.h');
    const isHppFile =
        isHFile ||
        file.endsWith('.hpp') ||
        file.endsWith('.hxx') ||
        file.endsWith('.hh');
    if (tag === 'c') {
        return isHFile || isCFile;
    } else if (tag === 'cpp') {
        return isHppFile || isCppFile;
    }
    return false;
};
