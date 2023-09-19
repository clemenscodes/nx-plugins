import * as fileExistsModule from '../fileExists/fileExists';
import { getConfigFile } from './getConfigFile';

describe('getConfigFile', () => {
    let fileExistsMock: jest.SpyInstance;
    let configFile: string;
    let workspaceRoot: string;
    let projectRoot: string;

    beforeEach(() => {
        configFile = '.clang-format';
        workspaceRoot = '/workspace';
        projectRoot = '/project';
        fileExistsMock = jest.spyOn(fileExistsModule, 'fileExists');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return config file from project if it exists', async () => {
        fileExistsMock.mockResolvedValueOnce(true);
        const result = await getConfigFile(
            configFile,
            workspaceRoot,
            projectRoot
        );
        expect(result).toBe('/workspace/project/.clang-format');
    });

    it('should return config file from root if in project it does not exist', async () => {
        fileExistsMock.mockResolvedValueOnce(false);
        fileExistsMock.mockResolvedValueOnce(true);
        const result = await getConfigFile(
            configFile,
            workspaceRoot,
            projectRoot
        );
        expect(result).toBe('/workspace/.clang-format');
    });

    it('should error if config file does not exist', async () => {
        fileExistsMock.mockResolvedValueOnce(false);
        fileExistsMock.mockResolvedValueOnce(false);
        await expect(
            getConfigFile(configFile, workspaceRoot, projectRoot)
        ).rejects.toThrowError(
            `Could not find .clang-format. Please generate a preset using nx-cmake:init or provide your own.`
        );
    });
});
