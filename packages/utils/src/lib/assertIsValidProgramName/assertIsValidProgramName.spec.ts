import { Program } from '@/types';
import { assertIsValidProgramName } from './assertIsValidProgramName';

describe('assertIsValidProgramName', () => {
    let program: Program;

    beforeEach(() => {
        program = 'gcc';
    });

    it('should assert that gcc argument is a valid program name', () => {
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that make argument is a valid program name', () => {
        program = 'make';
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that cmake argument is a valid program name', () => {
        program = 'cmake';
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that ctest argument is a valid program name', () => {
        program = 'ctest';
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that gdb argument is a valid program name', () => {
        program = 'gdb';
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that nasm argument is a valid program name', () => {
        program = 'nasm';
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that clangTidy argument is a valid program name', () => {
        program = 'clangTidy';
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });

    it('should assert that clangFormat argument is a valid program name', () => {
        program = 'clangFormat';
        expect(() => assertIsValidProgramName(program)).not.toThrowError();
    });
});
