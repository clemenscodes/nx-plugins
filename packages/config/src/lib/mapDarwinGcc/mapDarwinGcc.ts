import type { Program } from '../nx-cmake.types';
import { mapLinuxProgram } from '../mapLinuxProgram/mapLinuxProgram';

export const mapDarwinGcc = (): string[] => {
    const gcc8 = mapLinuxProgram('gcc-8' as Program);
    const gcc9 = mapLinuxProgram('gcc-9' as Program);
    const gcc10 = mapLinuxProgram('gcc-10' as Program);
    const gcc11 = mapLinuxProgram('gcc-11' as Program);
    const gcc12 = mapLinuxProgram('gcc-12' as Program);
    const gcc13 = mapLinuxProgram('gcc-13' as Program);
    return [...gcc8, ...gcc9, ...gcc10, ...gcc11, ...gcc12, ...gcc13];
};
