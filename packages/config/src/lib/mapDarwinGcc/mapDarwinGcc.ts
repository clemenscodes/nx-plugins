import type { Program } from '../nx-cmake.types';
import { mapLinuxProgram } from '../mapLinuxProgram/mapLinuxProgram';

export const mapDarwinGcc = (): string[] => {
    const MIN_GCC_VERSION = 8;
    const gccVersions = Array.from(
        { length: 6 },
        (_, i) => `gcc-${i + MIN_GCC_VERSION}`,
    );
    return gccVersions.flatMap((version) =>
        mapLinuxProgram(version as Program),
    );
};
