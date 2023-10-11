import type { Program } from '../getPrograms';
import {
    GCC,
    MAKE,
    CMAKE,
    CTEST,
    GDB,
    NASM,
    CLANG_FORMAT,
    CLANG_TIDY,
} from '../getPrograms';

export function assertIsValidProgramName(
    program: Program,
): asserts program is Program {
    switch (program) {
        case GCC:
            break;
        case MAKE:
            break;
        case CMAKE:
            break;
        case CTEST:
            break;
        case NASM:
            break;
        case GDB:
            break;
        case CLANG_TIDY:
            break;
        case CLANG_FORMAT:
            break;
        default:
            throw new Error(`${program} is not a valid program`);
    }
}
