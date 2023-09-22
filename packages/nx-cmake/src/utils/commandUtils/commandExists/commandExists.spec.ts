import { commandExists } from './commandExists';
import * as exeucteCommandModule from '../executeCommand/executeCommand';

describe('commandExists', () => {
    let executeCommandMock: jest.SpyInstance;

    beforeEach(() => {
        executeCommandMock = jest.spyOn(exeucteCommandModule, 'executeCommand');
    });

    afterEach(() => {
        executeCommandMock.mockRestore();
    });

    it('should return true if command exists', () => {
        const result = commandExists('clang-tidy');
        expect(result).toBe(true);
        expect(executeCommandMock).toBeCalledWith('command -v clang-tidy');
    });

    it('should return false if command exists', () => {
        const result = commandExists(
            'clang-tidy-which-absolutely-doesnt-exist',
        );
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledWith(
            'command -v clang-tidy-which-absolutely-doesnt-exist',
        );
    });

    it('should return false for null command', () => {
        const result = commandExists(null);
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledTimes(0);
    });

    it('should return false for undefined command', () => {
        const result = commandExists(undefined);
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledTimes(0);
    });

    it('should handle a command with spaces', () => {
        const result = commandExists('ls command with spaces');
        expect(result).toBe(true);
        expect(executeCommandMock).toBeCalledWith('command -v ls');
    });

    it('should handle a command with special characters', () => {
        const result = commandExists('command-with-$pecial-ch@racters');
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledWith(
            'command -v command-with-$pecial-ch@racters',
        );
    });

    it('should return false for a non-executable command', () => {
        const result = commandExists('/path/to/a/directory');
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledWith(
            'command -v /path/to/a/directory',
        );
    });

    it('should handle a command that exists with arguments', () => {
        const result = commandExists('ls -l');
        expect(result).toBe(true);
        expect(executeCommandMock).toBeCalledWith('command -v ls');
    });

    it('should return false for a command that does not exist with arguments', () => {
        const result = commandExists('doesnt --exit -l');
        expect(result).toBe(false);
        expect(executeCommandMock).toBeCalledWith('command -v doesnt');
    });
});
