import * as runCommandModule from '../runCommand/runCommand';

describe('executeCommandForFiles', () => {
    let runCommandMock: jest.SpyInstance;
    let command: string;
    let files: string[];

    beforeEach(() => {
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        command = 'command-to-test';
        files = [
            'file0',
            'file1',
            'file2',
            'file3',
            'file4',
            'file5',
            'file6',
            'file7',
            'file8',
            'file9',
        ];
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should execute for command for all files');

    it.todo('should return false if a single command failed');

    it.todo('should return true if a all commands succeeded');
});
