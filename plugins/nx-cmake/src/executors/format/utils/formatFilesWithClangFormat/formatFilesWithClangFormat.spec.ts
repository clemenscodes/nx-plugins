import type { FormatExecutorSchema } from '../../schema';
import { formatFilesWithClangFormat } from './formatFilesWithClangFormat';
import * as getProjectFilesModule from '@/file/lib/getProjectFiles/getProjectFiles';
import * as checkCommandExistsModule from '@/command/lib/checkCommandExists/checkCommandExists';
import * as executeCommandForFilesModule from '@/command/lib/executeCommandForFiles/executeCommandForFiles';
import * as getFormatArgumentsModule from '../getFormatArguments/getFormatArguments';

describe('formatFilesWithClangFormat', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: FormatExecutorSchema;
    let getFormatArgumentsMock: jest.SpyInstance;
    let getProjectFilesMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let executeCommandForFilesMock: jest.SpyInstance;
    let formatCommand: string;
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
        getProjectFilesMock = jest.spyOn(
            getProjectFilesModule,
            'getProjectFiles',
        );
        checkCommandExistsMock = jest.spyOn(
            checkCommandExistsModule,
            'checkCommandExists',
        );
        executeCommandForFilesMock = jest.spyOn(
            executeCommandForFilesModule,
            'executeCommandForFiles',
        );
        formatCommand = 'clang-format';
        formatArgs = ['--style=file:/path/to/.clang-format', '--verbose', '-i'];
        sourceFiles = ['/path/to/file1.cpp', '/path/to/file2.cpp'];
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should pass executor arguments to clang-format', async () => {
        getFormatArgumentsMock.mockResolvedValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        checkCommandExistsMock.mockReturnValue(formatCommand);
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
            formatCommand,
            formatArgs,
            sourceFiles,
        );
    });

    it('should return true if all files were successfully formatted', async () => {
        getFormatArgumentsMock.mockResolvedValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        checkCommandExistsMock.mockReturnValue(formatCommand);
        executeCommandForFilesMock.mockReturnValue(true);
        const result = await formatFilesWithClangFormat(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(true);
    });

    it('should return false if not all files were successfully formatted', async () => {
        getFormatArgumentsMock.mockResolvedValue(formatArgs);
        getProjectFilesMock.mockReturnValue(sourceFiles);
        checkCommandExistsMock.mockReturnValue(formatCommand);
        executeCommandForFilesMock.mockReturnValue(false);
        const result = await formatFilesWithClangFormat(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(false);
    });
});
