import type { LintExecutorSchema } from '../../schema';
import { lintFilesWithClangTidy } from './lintFilesWithClangTidy';
import { CLANG_TIDY, LINUX_GCC } from '@/config';
import * as getProjectFilesModule from '@/file/lib/getProjectFiles/getProjectFiles';
import * as checkCommandExistsModule from '@/command/lib/checkCommandExists/checkCommandExists';
import * as runCommandModule from '@/command/lib/runCommand/runCommand';
import * as getLintArgumentsModule from '../getLintArguments/getLintArguments';
import * as fileExistsModule from '@/file/lib/fileExists/fileExists';
import * as isDarwinModule from '@/utils/lib/isDarwin/isDarwin';
import * as isWindowsModule from '@/utils/lib/isWindows/isWindows';
import * as getClangTidyModule from '../getClangTidy/getClangTidy';

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
    let clangTidyMock: string;
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
        clangTidyMock = LINUX_GCC[0];
        jest.spyOn(getClangTidyModule, 'getClangTidy').mockReturnValue(
            clangTidyMock,
        );
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
        expect(checkCommandExistsMock).toHaveBeenCalledWith(CLANG_TIDY);
        expect(runCommandMock).toHaveBeenCalledWith(
            clangTidyMock,
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
            clangTidyMock,
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
            clangTidyMock,
            ...lintArgsMock,
            ...sourceFilesMock,
        );
        expect(result).toBe(false);
    });
});
