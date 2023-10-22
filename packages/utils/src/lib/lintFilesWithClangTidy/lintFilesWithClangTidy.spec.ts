import { lintFilesWithClangTidy } from './lintFilesWithClangTidy';
import { CLANG_TIDY, LINUX_GCC, LintExecutorSchema } from '@/config';
import * as getLintArgumentsModule from '../getLintArguments/getLintArguments';
import * as fileModule from '@/file';
import * as configModule from '@/config';
import * as utilsModule from '@/util';

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
        getProjectFilesMock = jest.spyOn(fileModule, 'getProjectFiles');
        checkCommandExistsMock = jest
            .spyOn(utilsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        isWindowsMock = jest
            .spyOn(utilsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(utilsModule, 'isDarwin')
            .mockReturnValue(false);
        jest.spyOn(fileModule, 'fileExists').mockReturnValue(true);
        clangTidyMock = LINUX_GCC[0];
        jest.spyOn(configModule, 'getClangTidy').mockReturnValue(clangTidyMock);
        runCommandMock = jest.spyOn(utilsModule, 'runCommand');
        lintArgsMock = ['--config-file=your_config_file', '-p=your_build_path'];
        sourceFilesMock = ['/path/to/file1.cpp', '/path/to/file2.cpp'];
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should pass executor arguments to clang-tidy', () => {
        getLintArgumentsMock.mockReturnValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        runCommandMock.mockReturnValueOnce({ success: true });
        lintFilesWithClangTidy(workspaceRoot, projectRoot, options);
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

    it('should return true if all files were successfully linted', () => {
        isDarwinMock.mockReturnValue(true);
        getLintArgumentsMock.mockReturnValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        runCommandMock.mockReturnValue({ success: true });
        const result = lintFilesWithClangTidy(
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

    it('should return false if not all files were successfully linted', () => {
        isWindowsMock.mockReturnValue(true);
        getLintArgumentsMock.mockReturnValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        runCommandMock.mockReturnValue({ success: false });
        const result = lintFilesWithClangTidy(
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
