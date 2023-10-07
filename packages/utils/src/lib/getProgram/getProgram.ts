import { PROGRAMS, Program } from '@/types';
import { fileExists } from '@/file';
import { isDarwin } from '../isDarwin/isDarwin';
import { isWindows } from '../isWindows/isWindows';
import { assertIsValidProgramName } from '../assertIsValidProgramName/assertIsValidProgramName';

export const getProgram = (program: Program): string => {
    assertIsValidProgramName(program);
    const { linux, darwin, windows } = PROGRAMS[program];
    if (isDarwin(process.platform)) {
        if (fileExists(darwin)) {
            return darwin;
        }
        throw new Error(`${program} was not found at expected path ${darwin}`);
    }
    if (isWindows(process.platform)) {
        if (fileExists(windows)) {
            return windows;
        }
        throw new Error(`${program} was not found at expected path ${windows}`);
    }
    if (fileExists(linux)) {
        return linux;
    }
    throw new Error(`${program} was not found at expected path ${linux}`);
};
