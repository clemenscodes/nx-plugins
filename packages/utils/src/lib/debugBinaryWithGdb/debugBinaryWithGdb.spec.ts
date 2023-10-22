import { DebugExecutorSchema, GDB, LINUX_GDB } from '@/config';
import { debugBinaryWithGdb } from './debugBinaryWithGdb';
import { join } from 'path';
import * as fileModule from '@/file';
import * as configModule from '@/config';
import * as utilsModule from '@/util';

describe('debugBinaryWithGdb', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let projectName: string;
    let options: DebugExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;
    let getGdbReturnMock: string;

    beforeEach(() => {
        workspaceRoot = '/workspace';
        projectRoot = 'projectRoot';
        projectName = 'myProject';
        options = {
            args: [],
            release: false,
        };
        getGdbReturnMock = LINUX_GDB[0];
        jest.spyOn(fileModule, 'fileExists').mockReturnValue(true);
        jest.spyOn(configModule, 'getGdb').mockReturnValue(getGdbReturnMock);
        runCommandMock = jest.spyOn(utilsModule, 'runCommand');
        checkCommandExistsMock = jest
            .spyOn(utilsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        isWindowsMock = jest
            .spyOn(utilsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(utilsModule, 'isDarwin')
            .mockReturnValue(false);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should debug binary with gdb and return true', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = debugBinaryWithGdb(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith(GDB);
        expect(runCommandMock).toHaveBeenCalledWith(
            getGdbReturnMock,
            join(`${workspaceRoot}/dist/${projectRoot}/${projectName}`),
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
        expect(checkCommandExistsMock).toHaveBeenCalledWith(GDB);
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to gdb', () => {
        isDarwinMock.mockReturnValue(true);
        runCommandMock.mockReturnValue({ success: true });
        options.args = ['-ex', 'run', '--arg1', 'value1'];
        const result = debugBinaryWithGdb(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith(GDB);
        expect(runCommandMock).toHaveBeenCalledWith(
            getGdbReturnMock,
            join(`${workspaceRoot}/dist/${projectRoot}/${projectName}`),
            '-ex',
            'run',
            '--arg1',
            'value1',
        );
        expect(result).toBe(true);
    });

    it('should return false if gdb failed', () => {
        isWindowsMock.mockReturnValue(true);
        runCommandMock.mockReturnValue({ success: false });
        const result = debugBinaryWithGdb(
            workspaceRoot,
            projectRoot,
            projectName,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith(GDB);
        expect(runCommandMock).toHaveBeenCalledWith(
            getGdbReturnMock,
            join(`${workspaceRoot}/dist/${projectRoot}/${projectName}`),
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
