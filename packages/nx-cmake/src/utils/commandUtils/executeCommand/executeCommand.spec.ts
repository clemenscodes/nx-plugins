import { executeCommand } from './executeCommand';
import * as child_process from 'child_process';

describe('executeCommand', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should execute the given command and return the output', () => {
        const expectedOutput = 'Command output';
        const execSyncMock = jest
            .spyOn(child_process, 'execSync')
            .mockReturnValue(expectedOutput);

        const cmd = 'echo Hello, World!';
        const result = executeCommand(cmd);

        expect(result).toBe(expectedOutput);
        expect(execSyncMock).toHaveBeenCalledWith(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'pipe', 'pipe'],
        });

        execSyncMock.mockRestore();
    });

    it('should throw an error if the command execution fails', () => {
        const execSyncMock = jest
            .spyOn(child_process, 'execSync')
            .mockImplementation(() => {
                throw new Error('Command failed');
            });

        const cmd = 'invalid-command';

        let error: Error;
        try {
            executeCommand(cmd);
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Command failed');
        expect(execSyncMock).toHaveBeenCalledWith(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'pipe', 'pipe'],
        });

        execSyncMock.mockRestore();
    });
});
