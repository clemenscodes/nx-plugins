import type { LintExecutorSchema } from '../../schema';
import { lintFilesWithClangTidy } from './lintFilesWithClangTidy';
import {
    DARWIN_CLANG_TIDY,
    LINUX_CLANG_TIDY,
    WINDOWS_CLANG_TIDY,
} from '@/config';
import * as getProjectFilesModule from '@/file/lib/getProjectFiles/getProjectFiles';
import * as checkCommandExistsModule from '@/command/lib/checkCommandExists/checkCommandExists';
import * as runCommandModule from '@/command/lib/runCommand/runCommand';
import * as getLintArgumentsModule from '../getLintArguments/getLintArguments';
import * as fileExistsModule from '@/file/lib/fileExists/fileExists';
import * as isDarwinModule from '@/utils/lib/isDarwin/isDarwin';
import * as isWindowsModule from '@/utils/lib/isWindows/isWindows';

describe('lintFilesWithClangTidy', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: LintExecutorSchema;
    let getLintArgumentsMock: jest.SpyInstance;
    let getProjectFilesMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let runCommandMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;
    let lintArgsMock: string[];
    let sourceFilesMock: string[];

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = '/projectRoot';
        options = {
            args: [],
            release: false,
        };
        getLintArgumentsMock = jest.spyOn(
            getLintArgumentsModule,
            'getLintArguments',
        );
        getProjectFilesMock = jest.spyOn(
            getProjectFilesModule,
            'getProjectFiles',
        );
        checkCommandExistsMock = jest
            .spyOn(checkCommandExistsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(isDarwinModule, 'isDarwin')
            .mockReturnValue(false);
        jest.spyOn(fileExistsModule, 'fileExists').mockReturnValue(true);
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        lintArgsMock = ['--config-file=your_config_file', '-p=your_build_path'];
        sourceFilesMock = ['/path/to/file1.cpp', '/path/to/file2.cpp'];
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should pass executor arguments to clang-tidy', async () => {
        getLintArgumentsMock.mockResolvedValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        runCommandMock.mockReturnValueOnce({ success: true });
        await lintFilesWithClangTidy(workspaceRoot, projectRoot, options);
        expect(getLintArgumentsMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(getProjectFilesMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('clang-tidy');
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CLANG_TIDY,
            ...lintArgsMock,
            ...sourceFilesMock,
        );
    });

    it('should return true if all files were successfully linted', async () => {
        isDarwinMock.mockReturnValue(true);
        getLintArgumentsMock.mockResolvedValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        runCommandMock.mockReturnValue({ success: true });
        const result = await lintFilesWithClangTidy(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(runCommandMock).toHaveBeenCalledWith(
            DARWIN_CLANG_TIDY,
            ...lintArgsMock,
            ...sourceFilesMock,
        );
        expect(result).toBe(true);
    });

    it('should return false if not all files were successfully linted', async () => {
        isWindowsMock.mockReturnValue(true);
        getLintArgumentsMock.mockResolvedValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        runCommandMock.mockReturnValue({ success: false });
        const result = await lintFilesWithClangTidy(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(runCommandMock).toHaveBeenCalledWith(
            WINDOWS_CLANG_TIDY,
            ...lintArgsMock,
            ...sourceFilesMock,
        );
        expect(result).toBe(false);
    });
});
