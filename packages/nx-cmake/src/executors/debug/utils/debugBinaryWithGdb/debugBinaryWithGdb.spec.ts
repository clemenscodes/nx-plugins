import type { DebugExecutorSchema } from '../../schema';
import { debugBinaryWithGdb } from './debugBinaryWithGdb';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

describe('debugBinaryWithGdb', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let projectName: string;
    let options: DebugExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspace';
        projectRoot = 'projectRoot';
        projectName = 'myProject';
        options = {
            args: [],
            release: false,
        };

        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        checkCommandExistsMock = jest.spyOn(
            checkCommandExistsModule,
            'checkCommandExists',
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should debug binary with gdb and return true', () => {
        checkCommandExistsMock.mockReturnValue('gdb');
        runCommandMock.mockReturnValue({ success: true });
        const result = debugBinaryWithGdb(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('gdb');
        expect(runCommandMock).toHaveBeenCalledWith(
            'gdb',
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
            ...options.args,
        );
        expect(result).toBe(true);
    });

    it('should error if gdb is not installed', () => {
        checkCommandExistsMock.mockImplementationOnce(() => {
            throw new Error();
        });
        expect(() =>
            debugBinaryWithGdb(
                workspaceRoot,
                projectRoot,
                projectName,
                options,
            ),
        ).toThrowError();
        expect(checkCommandExistsMock).toHaveBeenCalledWith('gdb');
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to gdb', () => {
        checkCommandExistsMock.mockReturnValue('gdb');
        runCommandMock.mockReturnValue({ success: true });
        options.args = ['-ex', 'run', '--arg1', 'value1'];
        const result = debugBinaryWithGdb(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('gdb');
        expect(runCommandMock).toHaveBeenCalledWith(
            'gdb',
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
            '-ex',
            'run',
            '--arg1',
            'value1',
        );
        expect(result).toBe(true);
    });

    it('should return false if gdb failed', () => {
        checkCommandExistsMock.mockReturnValue('gdb');
        runCommandMock.mockReturnValue({ success: false });
        const result = debugBinaryWithGdb(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('gdb');
        expect(runCommandMock).toHaveBeenCalledWith(
            'gdb',
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
