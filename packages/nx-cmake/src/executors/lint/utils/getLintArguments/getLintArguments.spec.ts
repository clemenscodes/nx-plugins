import type { LintExecutorSchema } from '../../schema';
import * as getConfigFileModule from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

describe('getLintArguments', () => {
    let getConfigFileMock: jest.SpyInstance;
    let workspaceRoot: string;
    let projectRoot: string;
    let options: LintExecutorSchema;

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
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should get lint arguments for clang-tidy');
    it.todo('should add arguments at the end');
    it.todo('should error if config file does not exist');
});
