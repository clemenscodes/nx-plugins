import { join } from 'path';
import { Program, MAKE } from '../getPrograms';

export const mapWindowsProgram = (program: Program): string[] => {
    if (program === MAKE) {
        program = 'mingw32-make' as Program;
    }
    return [program].flatMap((program) =>
        [`C:/msys64`, `C:/tools/msys64`]
            .map((base) => join(base, 'ucrt64', 'bin'))
            .flatMap((base) => join(base, `${program}.exe`)),
    );
};
