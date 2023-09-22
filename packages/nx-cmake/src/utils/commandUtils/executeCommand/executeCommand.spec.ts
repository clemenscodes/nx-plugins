import { executeCommand } from './executeCommand';
import * as child_process from 'child_process';

describe('executeCommand', () => {
    let execSyncMock: jest.SpyInstance;

    beforeEach(() => {
        execSyncMock = jest.spyOn(child_process, 'execSync');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should execute the given command and return the output', () => {
        const expectedOutput = 'Command output';
        execSyncMock.mockReturnValue(expectedOutput);
        const cmd = 'echo Hello, World!';
        const result = executeCommand(cmd);
        expect(result).toBe(expectedOutput);
        expect(execSyncMock).toHaveBeenCalledWith(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'pipe', 'pipe'],
        });
    });

    it('should throw an error if the command execution fails', () => {
        execSyncMock.mockImplementation(() => {
            throw new Error('Command failed');
        });
        const cmd = 'invalid-command';
        expect(() => executeCommand(cmd)).toThrowError('Command failed');
        expect(execSyncMock).toHaveBeenCalledWith(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'pipe', 'pipe'],
        });
    });
});
