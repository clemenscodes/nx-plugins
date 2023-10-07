import { PROGRAMS, Program } from '@/config';
import { fileExists } from '@/file';
import { isDarwin } from '../isDarwin/isDarwin';
import { isWindows } from '../isWindows/isWindows';
import { assertIsValidProgramName } from '../assertIsValidProgramName/assertIsValidProgramName';

export const getProgram = (program: Program): string => {
    assertIsValidProgramName(program);
    const { linux, darwin, windows } = PROGRAMS[program];
    if (isDarwin(process.platform)) {
        for (const program of darwin) {
            if (fileExists(program)) {
                return program;
            }
        }
        throw new Error(`${program} was not found on paths ${darwin}`);
    }
    if (isWindows(process.platform)) {
        for (const program of windows) {
            if (fileExists(program)) {
                return program;
            }
        }
        throw new Error(`${program} was not found on paths ${windows}`);
    }
    for (const program of linux) {
        if (fileExists(program)) {
            return program;
        }
    }
    throw new Error(`${program} was not found on paths ${linux}`);
};
