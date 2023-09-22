import { getClangTidyConfigArgument } from './getClangTidyConfigArgument';
import * as getConfigFileModule from '../../../../../utils/fileUtils/getConfigFile/getConfigFile';

describe('getClangTidyConfigArgument', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let expectedConfigFile: string;
    let expectedArgument: string;
    let getConfigFileMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = '/projectRoot';
        expectedConfigFile = `${workspaceRoot}/${projectRoot}/.clang-tidy`;
        expectedArgument = `--config-file=${expectedConfigFile}`;
        getConfigFileMock = jest
            .spyOn(getConfigFileModule, 'getConfigFile')
            .mockImplementation(
                async (workspaceRoot, projectRoot, filename) => {
                    return `${workspaceRoot}/${projectRoot}/${filename}`;
                }
            );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the correct clang-tidy config argument', async () => {
        const result = await getClangTidyConfigArgument(
            workspaceRoot,
            projectRoot
        );
        expect(result).toBe(expectedArgument);
        expect(getConfigFileMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            '.clang-tidy'
        );
    });
});
