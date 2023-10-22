import type { Program } from '../getPrograms';
import { join } from 'path';

export const mapLinuxProgram = (program: Program): string[] => {
    return ['/usr/bin', '/usr/local/bin'].map((base) => join(base, program));
};
