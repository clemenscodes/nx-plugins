import type { LintExecutorSchema } from '../../schema';
import { CProjectType } from '../../../../models/types';
import * as getProjectFilesModule from '../../../../utils/fileUtils/getProjectFiles/getProjectFiles';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as getConfigFileModule from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

describe('lintFilesWithClangTidy', () => {
    let getConfigFileMock: jest.SpyInstance;
    let getProjectFilesMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let runCommandMock: jest.SpyInstance;
    let options: LintExecutorSchema;
    let workspaceRoot: string;
    let projectRoot: string;
    let projectType: CProjectType;

    beforeEach(() => {
        getConfigFileMock = jest.spyOn(getConfigFileModule, 'getConfigFile');
        getProjectFilesMock = jest.spyOn(
            getProjectFilesModule,
            'getProjectFiles'
        );
        checkCommandExistsMock = jest.spyOn(
            checkCommandExistsModule,
            'checkCommandExists'
        );
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        options = {
            args: [],
        };
        workspaceRoot = '/workspaceRoot';
        projectRoot = '/projectRoot';
        projectType = CProjectType.Lib;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should pass executor arguments to clang-tidy');
    it.todo('should return true if all files were successfully linted');
    it.todo('should return false if not all files were successfully linted');
});
