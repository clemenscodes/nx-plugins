import type { FormatExecutorSchema } from '../../schema';
import { CProjectType } from '../../../../models/types';
import * as getProjectFilesModule from '../../../../utils/fileUtils/getProjectFiles/getProjectFiles';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import * as executeCommandForFilesModule from '../../../../utils/commandUtils/executeCommandForFiles/executeCommandForFiles';
import * as getConfigFileModule from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

describe('formatFilesWithClangFormat', () => {
    let getConfigFileMock: jest.SpyInstance;
    let getProjectFilesMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let executeCommandForFilesMock: jest.SpyInstance;
    let options: FormatExecutorSchema;
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
        executeCommandForFilesMock = jest.spyOn(
            executeCommandForFilesModule,
            'executeCommandForFiles'
        );
        options = {
            args: [],
            verbose: true,
            editFilesInPlace: true,
        };
        workspaceRoot = '/workspaceRoot';
        projectRoot = '/projectRoot';
        projectType = CProjectType.Lib;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should pass executor arguments to clang-format');
    it.todo('should return true if all files were successfully formatted');
    it.todo('should return false if not all files were successfully formatted');
});
