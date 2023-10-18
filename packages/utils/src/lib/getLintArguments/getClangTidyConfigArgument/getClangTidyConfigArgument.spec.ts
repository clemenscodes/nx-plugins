import { CLANG_TIDY_CONFIG_FILE } from '@/config';
import { getClangTidyConfigArgument } from './getClangTidyConfigArgument';
import { join } from 'path';
import * as fileModule from '@/file';

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
            `${workspaceRoot}/${projectRoot}/${CLANG_TIDY_CONFIG_FILE}`,
        );
        expectedArgument = `--config-file=${expectedConfigFile}`;
        getConfigFileMock = jest
            .spyOn(fileModule, 'getConfigFile')
            .mockImplementation((workspaceRoot, projectRoot, filename) => {
                return join(`${workspaceRoot}/${projectRoot}/${filename}`);
            });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the correct clang-tidy config argument', () => {
        const result = getClangTidyConfigArgument(workspaceRoot, projectRoot);
        expect(result).toBe(expectedArgument);
        expect(getConfigFileMock).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            CLANG_TIDY_CONFIG_FILE,
        );
    });
});
