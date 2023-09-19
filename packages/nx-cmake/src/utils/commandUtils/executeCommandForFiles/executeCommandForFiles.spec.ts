import * as runCommandModule from '../runCommand/runCommand';
import { executeCommandForFiles } from './executeCommandForFiles';

describe('executeCommandForFiles', () => {
    let runCommandMock: jest.SpyInstance;
    let command: string;
    let args: string[];
    let files: string[];

    beforeEach(() => {
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        command = 'command-to-test';
        args = ['arg1', 'arg2'];
        files = ['file1', 'file2', 'file3'];
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should execute the command for all files and return true if all commands succeeded', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = executeCommandForFiles(command, args, files);

        expect(result).toBe(true);
        expect(runCommandMock).toHaveBeenCalledTimes(files.length);
        expect(runCommandMock).toHaveBeenCalledWith(
            command,
            'arg1',
            'arg2',
            'file1'
        );
        expect(runCommandMock).toHaveBeenCalledWith(
            command,
            'arg1',
            'arg2',
            'file2'
        );
        expect(runCommandMock).toHaveBeenCalledWith(
            command,
            'arg1',
            'arg2',
            'file3'
        );
    });

    it('should return false if a single command failed', () => {
        runCommandMock
            .mockReturnValueOnce({ success: false })
            .mockReturnValue({ success: true });
        const result = executeCommandForFiles(command, args, files);
        expect(result).toBe(false);
        expect(runCommandMock).toHaveBeenCalledTimes(files.length);
    });

    it('should return true if all commands succeeded', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = executeCommandForFiles(command, args, files);
        expect(result).toBe(true);
        expect(runCommandMock).toHaveBeenCalledTimes(files.length);
    });
});
