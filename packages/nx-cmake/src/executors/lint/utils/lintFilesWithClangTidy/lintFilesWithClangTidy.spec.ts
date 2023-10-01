import type { LintExecutorSchema } from '../../schema';
import { lintFilesWithClangTidy } from './lintFilesWithClangTidy';
import * as getProjectFilesModule from '../../../../utils/fileUtils/getProjectFiles/getProjectFiles';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as getLintArgumentsModule from '../getLintArguments/getLintArguments';

describe('lintFilesWithClangTidy', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: LintExecutorSchema;
    let getLintArgumentsMock: jest.SpyInstance;
    let getProjectFilesMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let runCommandMock: jest.SpyInstance;
    let lintCommandMock: string;
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
        checkCommandExistsMock = jest.spyOn(
            checkCommandExistsModule,
            'checkCommandExists',
        );
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        lintCommandMock = 'clang-tidy';
        lintArgsMock = ['--config-file=your_config_file', '-p=your_build_path'];
        sourceFilesMock = ['/path/to/file1.cpp', '/path/to/file2.cpp'];
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should pass executor arguments to clang-tidy', async () => {
        getLintArgumentsMock.mockResolvedValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        checkCommandExistsMock.mockReturnValue(lintCommandMock);
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
            lintCommandMock,
            ...lintArgsMock,
            ...sourceFilesMock,
        );
    });

    it('should return true if all files were successfully linted', async () => {
        getLintArgumentsMock.mockResolvedValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        runCommandMock.mockReturnValue({ success: true });
        const result = await lintFilesWithClangTidy(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(true);
    });

    it('should return false if not all files were successfully linted', async () => {
        getLintArgumentsMock.mockResolvedValue(lintArgsMock);
        getProjectFilesMock.mockReturnValue(sourceFilesMock);
        runCommandMock.mockReturnValue({ success: false });
        const result = await lintFilesWithClangTidy(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(false);
    });
});
