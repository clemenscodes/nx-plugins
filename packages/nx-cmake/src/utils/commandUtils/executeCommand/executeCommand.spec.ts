import { executeCommand } from './executeCommand';
import * as child_process from 'child_process';

describe('executeCommand', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should execute the given command and return the output', () => {
        // Mock execSync to simulate a successful command execution
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
        // Mock execSync to throw an error, simulating a failed command execution
        const execSyncMock = jest
            .spyOn(child_process, 'execSync')
            .mockImplementation(() => {
                throw new Error('Command failed');
            });

        const cmd = 'invalid-command';

        // Use a try-catch block to capture the error thrown by executeCommand
        let error: Error;
        try {
            executeCommand(cmd);
        } catch (e) {
            error = e;
        }

        // Verify that the error was thrown
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Command failed');
        expect(execSyncMock).toHaveBeenCalledWith(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'pipe', 'pipe'],
        });

        execSyncMock.mockRestore();
    });

    // Add more test cases to cover different scenarios as needed
});
