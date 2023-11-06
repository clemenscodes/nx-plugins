import { fileExists } from '@/file';
import { assertIsValidProgramName } from '../assertIsValidProgramName/assertIsValidProgramName';
import { Program, PROGRAMS } from '../getPrograms';
import { isDarwin, isWindows } from '@/util';
import { logger } from '@/log';

export const getFirstMatch = (
    program: Program,
    paths: ReadonlyArray<string>,
): string => {
    for (const path of paths) {
        if (fileExists(path)) {
            return path;
        }
    }
    logger(`${program} was not found on default paths`);
    return program;
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
