import { commandExists } from './commandExists';
import * as isWindowsModule from '@/utils/lib/isWindows/isWindows';
import * as executeCommandModule from '../executeCommand/executeCommand';

describe('commandExists', () => {
    let executeCommandMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;

    beforeEach(() => {
        executeCommandMock = jest.spyOn(executeCommandModule, 'executeCommand');
        isWindowsMock = jest.spyOn(isWindowsModule, 'isWindows');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should call where if on windows and return true if command exists', () => {
        isWindowsMock.mockReturnValue(true);
        executeCommandMock.mockReturnValue(true);
        const result = commandExists('clang-tidy');
        expect(result).toBe(true);
        expect(executeCommandMock).toBeCalledWith('where.exe clang-tidy');
    });

    it('should call command if on unix and return true if command exists', () => {
        isWindowsMock.mockReturnValue(false);
        executeCommandMock.mockReturnValue(true);
        const result = commandExists('clang-tidy');
        expect(result).toBe(true);
        expect(executeCommandMock).toBeCalledWith('command -v clang-tidy');
    });

    it('should return false if command exists', () => {
        isWindowsMock.mockReturnValue(false);
        executeCommandMock.mockReturnValue(false);
        const result = commandExists(
            'clang-tidy-which-absolutely-doesnt-exist',
        );
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledWith(
            'command -v clang-tidy-which-absolutely-doesnt-exist',
        );
    });

    it('should handle a command with spaces', () => {
        isWindowsMock.mockReturnValue(false);
        executeCommandMock.mockReturnValue(true);
        const result = commandExists('ls command with spaces');
        expect(result).toBe(true);
        expect(executeCommandMock).toBeCalledWith('command -v ls');
    });

    it('should handle a command with special characters', () => {
        isWindowsMock.mockReturnValue(false);
        executeCommandMock.mockReturnValue(false);
        const result = commandExists('command-with-$pecial-ch@racters');
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledWith(
            'command -v command-with-$pecial-ch@racters',
        );
    });

    it('should return false for a non-executable command', () => {
        isWindowsMock.mockReturnValue(false);
        executeCommandMock.mockReturnValue(true);
        const result = commandExists('/path/to/a/directory');
        expect(result).toBe(true);
        expect(executeCommandMock).toBeCalledWith(
            'command -v /path/to/a/directory',
        );
    });

    it('should handle a command that exists with arguments', () => {
        isWindowsMock.mockReturnValue(false);
        executeCommandMock.mockReturnValue(true);
        const result = commandExists('ls -l');
        expect(result).toBe(true);
        expect(executeCommandMock).toBeCalledWith('command -v ls');
    });

    it('should return false for a command that does not exist with arguments', () => {
        isWindowsMock.mockReturnValue(false);
        executeCommandMock.mockReturnValue(false);
        const result = commandExists('doesnt --exit -l');
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledWith('command -v doesnt');
    });
});
