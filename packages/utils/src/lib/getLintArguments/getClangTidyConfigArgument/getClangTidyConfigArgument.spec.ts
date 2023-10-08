import { getClangTidyConfigArgument } from './getClangTidyConfigArgument';
import * as fileModule from '@/file';
import { join } from 'path';

describe('getClangTidyConfigArgument', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let expectedConfigFile: string;
    let expectedArgument: string;
    let getConfigFileMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspaceRoot';
        projectRoot = '/projectRoot';
        expectedConfigFile = join(
            `${workspaceRoot}/${projectRoot}/.clang-tidy.yml`,
        );
        expectedArgument = `--config-file=${expectedConfigFile}`;
        getConfigFileMock = jest
            .spyOn(fileModule, 'getConfigFile')
            .mockImplementation(
                async (workspaceRoot, projectRoot, filename) => {
                    return join(`${workspaceRoot}/${projectRoot}/${filename}`);
                },
            );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the correct clang-tidy config argument', async () => {
        const result = await getClangTidyConfigArgument(
            workspaceRoot,
            projectRoot,
        );
        expect(result).toBe(expectedArgument);
        expect(getConfigFileMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            '.clang-tidy.yml',
        );
    });
});
