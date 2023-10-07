import { PROGRAMS, Program } from '@/config';
import { fileExists } from '@/file';
import { isDarwin } from '../isDarwin/isDarwin';
import { isWindows } from '../isWindows/isWindows';
import { assertIsValidProgramName } from '../assertIsValidProgramName/assertIsValidProgramName';

export const getFirstMatch = (
    program: Program,
    paths: ReadonlyArray<string>,
): string => {
    for (const path of paths) {
        if (fileExists(path)) {
            return path;
        }
    }
    throw new Error(`${program} was not found on paths ${paths}`);
};

export const getProgram = (program: Program): string => {
    assertIsValidProgramName(program);
    const { linux, darwin, windows } = PROGRAMS[program];
    if (isDarwin(process.platform)) {
        return getFirstMatch(program, darwin);
    }
    if (isWindows(process.platform)) {
        return getFirstMatch(program, windows);
    }
    return getFirstMatch(program, linux);
};
