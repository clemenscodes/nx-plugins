import { assertIsValidProgramName } from './assertIsValidProgramName';
import {
    CLANG_FORMAT,
    CLANG_TIDY,
    CMAKE,
    CTEST,
    GCC,
    GDB,
    MAKE,
    NASM,
    type Program,
} from '../getPrograms';

describe('assertIsValidProgramName', () => {
    let program: Program;

    it('should assert that gcc argument is a valid program name', () => {
        program = GCC;
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that make argument is a valid program name', () => {
        program = MAKE;
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that cmake argument is a valid program name', () => {
        program = CMAKE;
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that ctest argument is a valid program name', () => {
        program = CTEST;
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that gdb argument is a valid program name', () => {
        program = GDB;
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that nasm argument is a valid program name', () => {
        program = NASM;
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that clang-tidy argument is a valid program name', () => {
        program = CLANG_TIDY;
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that clang-format argument is a valid program name', () => {
        program = CLANG_FORMAT;
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that anything else is not a valid program name', () => {
        program = 'invalid' as Program;
        expect(() => assertIsValidProgramName(program)).toThrowError(
            `${program} is not a valid program`,
        );
    });
});
