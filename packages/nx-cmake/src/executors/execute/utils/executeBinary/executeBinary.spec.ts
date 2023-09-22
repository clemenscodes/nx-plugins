import type { ExecuteExecutorSchema } from '../../schema';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as fileExistsModule from '../../../../utils/fileUtils/fileExists/fileExists';
import { executeBinary } from './executeBinary';

describe('executeBinary', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let projectName: string;
    let runCommandMock: jest.SpyInstance;
    let fileExistsMock: jest.SpyInstance;
    let options: ExecuteExecutorSchema;

    beforeEach(() => {
        workspaceRoot = '/workspace';
        projectRoot = 'projectRoot';
        projectName = 'myProject';
        options = {
            args: [],
        };

        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        fileExistsMock = jest.spyOn(fileExistsModule, 'fileExists');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should debug binary with gdb and return true', () => {
        fileExistsMock.mockReturnValue(true);
        runCommandMock.mockReturnValue({ success: true });
        const result = executeBinary(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(runCommandMock).toHaveBeenCalledWith(
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
            ...options.args,
        );
        expect(result).toBe(true);
    });

    it('should error if binary does not exist', () => {
        fileExistsMock.mockReturnValue(false);
        expect(() =>
            executeBinary(workspaceRoot, projectRoot, projectName, options),
        ).toThrowError(
            `The binary of ${projectName} was not found and cound not be executed.`,
        );
        expect(fileExistsMock).toHaveBeenCalledWith(
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
        );
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to binary', () => {
        fileExistsMock.mockReturnValue(true);
        runCommandMock.mockReturnValue({ success: true });
        options.args = ['-ex', 'run', '--arg1', 'value1'];
        const result = executeBinary(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(runCommandMock).toHaveBeenCalledWith(
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
            '-ex',
            'run',
            '--arg1',
            'value1',
        );
        expect(result).toBe(true);
    });

    it('should return false if binary failed', () => {
        fileExistsMock.mockReturnValue(true);
        runCommandMock.mockReturnValue({ success: false });
        const result = executeBinary(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(runCommandMock).toHaveBeenCalledWith(
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
