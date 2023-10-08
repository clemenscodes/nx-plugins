import { assertIsValidProgramName } from './assertIsValidProgramName';
import {
    Program,
    GCC,
    MAKE,
    CMAKE,
    CTEST,
    GDB,
    NASM,
    CLANG_TIDY,
    CLANG_FORMAT,
} from '@/config';

describe('assertIsValidProgramName', () => {
    let program: Program;

    beforeEach(() => {
        program = GCC;
    });

    it('should assert that gcc argument is a valid program name', () => {
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
});
