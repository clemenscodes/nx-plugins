import type { Program } from '../nx-cmake.types';
import { join } from 'path';

export const mapWindowsProgram = (program: Program): string[] => {
    if (program === 'make') {
        program = 'mingw32-make' as Program;
    }
    const windowsSuffix = 'exe';
    const msysBase = `C:/msys64`;
    const msysChocolateyBase = `C:/tools/msys64`;
    const bases = [msysBase, msysChocolateyBase];
    const mergedBases = bases.map((base) => {
        const ucrtBinPath = join(base, 'ucrt64', 'bin');
        return ucrtBinPath;
    });
    const mappedPrograms = [program].flatMap((program) => {
        const mergedProgram = mergedBases.flatMap((base) => {
            const fullProgram = `${program}.${windowsSuffix}`;
            const fullPath = join(base, fullProgram);
            return fullPath;
        });
        return mergedProgram;
    });
    return mappedPrograms;
};
