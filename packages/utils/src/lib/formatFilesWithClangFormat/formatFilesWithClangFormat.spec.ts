import { FormatExecutorSchema, LINUX_CLANG_FORMAT } from '@/config';
import { formatFilesWithClangFormat } from './formatFilesWithClangFormat';
import * as fileModule from '@/file';
import * as getFormatArgumentsModule from '../getFormatArguments/getFormatArguments';
import * as getClangFormatModule from '../getClangFormat/getClangFormat';
import * as checkCommandExistsModule from '../checkCommandExists/checkCommandExists';
import * as isDarwinModule from '../isDarwin/isDarwin';
import * as isWindowsModule from '../isWindows/isWindows';
import * as executeCommandForFilesModule from '../executeCommandForFiles/executeCommandForFiles';

describe('formatFilesWithClangFormat', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: FormatExecutorSchema;
    let getFormatArgumentsMock: jest.SpyInstance;
    let getProjectFilesMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let executeCommandForFilesMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;
    let formatArgs: string[];
    let sourceFiles: string[];

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = '/projectRoot';
        options = {
            args: [],
            verbose: true,
            editFilesInPlace: true,
        };
        getFormatArgumentsMock = jest.spyOn(
            getFormatArgumentsModule,
            'getFormatArguments',
        );
        getProjectFilesMock = jest.spyOn(fileModule, 'getProjectFiles');
        checkCommandExistsMock = jest
            .spyOn(checkCommandExistsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        executeCommandForFilesMock = jest.spyOn(
            executeCommandForFilesModule,
            'executeCommandForFiles',
        );
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(isDarwinModule, 'isDarwin')
            .mockReturnValue(false);
        jest.spyOn(fileModule, 'fileExists').mockReturnValue(true);
        jest.spyOn(getClangFormatModule, 'getClangFormat').mockReturnValue(
            LINUX_CLANG_FORMAT[0],
        );
        formatArgs = ['--style=file:/path/to/.clang-format', '--verbose', '-i'];
        sourceFiles = ['/path/to/file1.cpp', '/path/to/file2.cpp'];
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should pass executor arguments to clang-format', async () => {
        getFormatArgumentsMock.mockReturnValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        executeCommandForFilesMock.mockReturnValue(true);
        await formatFilesWithClangFormat(workspaceRoot, projectRoot, options);
        expect(getFormatArgumentsMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(getProjectFilesMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('clang-format');
        expect(executeCommandForFilesMock).toHaveBeenCalledWith(
            LINUX_CLANG_FORMAT[0],
            formatArgs,
            sourceFiles,
        );
    });

    it('should return true if all files were successfully formatted', async () => {
        isWindowsMock.mockReturnValue(true);
        getFormatArgumentsMock.mockResolvedValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        executeCommandForFilesMock.mockReturnValue(true);
        const result = await formatFilesWithClangFormat(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(executeCommandForFilesMock).toHaveBeenCalledWith(
            LINUX_CLANG_FORMAT[0],
            formatArgs,
            sourceFiles,
        );
        expect(result).toBe(true);
    });

    it('should return false if not all files were successfully formatted', async () => {
        isDarwinMock.mockReturnValue(true);
        getFormatArgumentsMock.mockResolvedValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        executeCommandForFilesMock.mockReturnValue(false);
        const result = await formatFilesWithClangFormat(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(executeCommandForFilesMock).toHaveBeenCalledWith(
            LINUX_CLANG_FORMAT[0],
            formatArgs,
            sourceFiles,
        );
        expect(result).toBe(false);
    });
});
