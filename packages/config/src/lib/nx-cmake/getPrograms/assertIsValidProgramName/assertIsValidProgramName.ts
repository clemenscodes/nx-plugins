import type { Program } from '../getPrograms';

export function assertIsValidProgramName(
    program: Program,
): asserts program is Program {
    switch (program) {
        case 'gcc':
            break;
        case 'make':
            break;
        case 'cmake':
            break;
        case 'ctest':
            break;
        case 'nasm':
            break;
        case 'gdb':
            break;
        case 'clang_tidy':
            break;
        case 'clang_format':
            break;
        default:
            throw new Error(`${program} is not a valid program`);
    }
}
