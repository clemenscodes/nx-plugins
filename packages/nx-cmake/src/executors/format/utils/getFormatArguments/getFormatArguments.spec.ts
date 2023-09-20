import type { FormatExecutorSchema } from '../../schema';
import * as getConfigFileModule from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

describe('getFormatArguments', () => {
    let getConfigFileMock: jest.SpyInstance;
    let workspaceRoot: string;
    let projectRoot: string;
    let options: FormatExecutorSchema;

    beforeEach(() => {
        getConfigFileMock = jest
            .spyOn(getConfigFileModule, 'getConfigFile')
            .mockImplementation(async (workspaceRoot, projectRoot) => {
                return `${workspaceRoot}/${projectRoot}/.clang-format`;
            });
        workspaceRoot = '/workspaceRoot';
        projectRoot = '/projectRoot';
        options = {
            args: [],
            verbose: true,
            editFilesInPlace: true,
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should get format arguments for clang-format');
    it.todo('should add arguments at the end');
    it.todo('should error if config file does not exist');
});