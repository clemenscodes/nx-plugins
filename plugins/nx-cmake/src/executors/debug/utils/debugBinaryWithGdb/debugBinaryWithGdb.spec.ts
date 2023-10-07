import type { DebugExecutorSchema } from '../../schema';
import { DARWIN_GDB, LINUX_GDB, WINDOWS_GDB } from '@/config';
import { debugBinaryWithGdb } from './debugBinaryWithGdb';
import * as runCommandModule from '@/command/lib/runCommand/runCommand';
import * as checkCommandExistsModule from '@/command/lib/checkCommandExists/checkCommandExists';
import * as fileExistsModule from '@/file/lib/fileExists/fileExists';
import * as isDarwinModule from '@/utils/lib/isDarwin/isDarwin';
import * as isWindowsModule from '@/utils/lib/isWindows/isWindows';

describe('debugBinaryWithGdb', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let projectName: string;
    let options: DebugExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspace';
        projectRoot = 'projectRoot';
        projectName = 'myProject';
        options = {
            args: [],
            release: false,
        };

        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        checkCommandExistsMock = jest
            .spyOn(checkCommandExistsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        jest.spyOn(fileExistsModule, 'fileExists').mockReturnValue(true);
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(isDarwinModule, 'isDarwin')
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
        expect(checkCommandExistsMock).toHaveBeenCalledWith('gdb');
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_GDB,
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
        isDarwinMock.mockReturnValue(true);
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
            DARWIN_GDB,
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
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
        expect(checkCommandExistsMock).toHaveBeenCalledWith('gdb');
        expect(runCommandMock).toHaveBeenCalledWith(
            WINDOWS_GDB,
            `${workspaceRoot}/dist/${projectRoot}/${projectName}`,
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
