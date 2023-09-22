import { runCommand } from './runCommand';
import * as child_process from 'child_process';

describe('runCommand', () => {
    let execSyncMock: jest.SpyInstance;

    beforeEach(() => {
        execSyncMock = jest.spyOn(child_process, 'execSync');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return success:true when the command succeeds', () => {
        execSyncMock.mockReturnValue('');
        const result = runCommand('echo', 'Hello,', 'World!');
        expect(result).toEqual({ success: true });
        expect(execSyncMock).toHaveBeenCalledWith('echo Hello, World!', {
            encoding: 'utf-8',
            stdio: ['inherit', 'inherit', 'inherit'],
        });
    });

    it('should return success:false when the command fails', () => {
        execSyncMock.mockImplementation(() => {
            throw new Error('Command failed');
        });
        const result = runCommand('invalid-command');
        expect(result).toEqual({ success: false });
        expect(execSyncMock).toHaveBeenCalledWith('invalid-command', {
            encoding: 'utf-8',
            stdio: ['inherit', 'inherit', 'inherit'],
        });
    });
});
