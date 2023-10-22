import { formatFilesWithClangFormat } from './formatFilesWithClangFormat';
import * as getFormatArgumentsModule from '../getFormatArguments/getFormatArguments';
import * as fileModule from '@/file';
import * as utilsModule from '@/util';
import {
    CLANG_FORMAT_CONFIG_FILE,
    FormatExecutorSchema,
    LINUX_CLANG_FORMAT,
} from '../../config';
import * as getClangFormatModule from '../../config/getPrograms/getClangFormat/getClangFormat';

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
            .spyOn(utilsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        executeCommandForFilesMock = jest.spyOn(
            utilsModule,
            'executeCommandForFiles',
        );
        isWindowsMock = jest
            .spyOn(utilsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(utilsModule, 'isDarwin')
            .mockReturnValue(false);
        jest.spyOn(fileModule, 'fileExists').mockReturnValue(true);
        jest.spyOn(getClangFormatModule, 'getClangFormat').mockReturnValue(
            LINUX_CLANG_FORMAT[0],
        );
        formatArgs = [
            `--style=file:/path/to/${CLANG_FORMAT_CONFIG_FILE}`,
            '--verbose',
            '-i',
        ];
        sourceFiles = ['/path/to/file1.cpp', '/path/to/file2.cpp'];
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should pass executor arguments to clang-format', () => {
        getFormatArgumentsMock.mockReturnValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        executeCommandForFilesMock.mockReturnValue(true);
        formatFilesWithClangFormat(workspaceRoot, projectRoot, options);
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

    it('should return true if all files were successfully formatted', () => {
        isWindowsMock.mockReturnValue(true);
        getFormatArgumentsMock.mockReturnValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        executeCommandForFilesMock.mockReturnValue(true);
        const result = formatFilesWithClangFormat(
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

    it('should return false if not all files were successfully formatted', () => {
        isDarwinMock.mockReturnValue(true);
        getFormatArgumentsMock.mockReturnValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        executeCommandForFilesMock.mockReturnValue(false);
        const result = formatFilesWithClangFormat(
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
