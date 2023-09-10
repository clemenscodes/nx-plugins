import { runCommand } from './runCommand';
import * as child_process from 'child_process';

describe('runCommand', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return success:true when the command succeeds', () => {
        const execSyncMock = jest
            .spyOn(child_process, 'execSync')
            .mockReturnValue('');

        const result = runCommand('echo', 'Hello,', 'World!');

        expect(result).toEqual({ success: true });
        expect(execSyncMock).toHaveBeenCalledWith('echo Hello, World!', {
            encoding: 'utf-8',
            stdio: ['inherit', 'inherit', 'inherit'],
        });

        execSyncMock.mockRestore();
    });

    it('should return success:false when the command fails', () => {
        const execSyncMock = jest
            .spyOn(child_process, 'execSync')
            .mockImplementation(() => {
                throw new Error('Command failed');
            });

        const result = runCommand('invalid-command');

        expect(result).toEqual({ success: false });
        expect(execSyncMock).toHaveBeenCalledWith('invalid-command', {
            encoding: 'utf-8',
            stdio: ['inherit', 'inherit', 'inherit'],
        });

        execSyncMock.mockRestore();
    });
});
