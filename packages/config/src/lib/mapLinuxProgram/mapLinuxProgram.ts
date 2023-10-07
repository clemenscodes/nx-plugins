import type { Program } from '../nx-cmake.types';
import { join } from 'path';

export const mapLinuxProgram = (program: Program): string[] => {
    const systemBinaries = '/usr/bin';
    const userBinaries = '/usr/local/bin';
    const mappedPrograms = [program].flatMap((program) => {
        const systemOption = join(systemBinaries, program);
        const userOption = join(userBinaries, program);
        return [systemOption, userOption];
    });
    return mappedPrograms;
};
