import { getConfigFile } from './getConfigFile';
import * as fileExistsModule from '../fileExists/fileExists';
import { join } from 'path';

describe('getConfigFile', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let configFile: string;
    let fileExistsMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspace';
        projectRoot = '/project';
        configFile = '.clang-format';
        fileExistsMock = jest.spyOn(fileExistsModule, 'fileExists');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return config file from project if it exists', async () => {
        fileExistsMock.mockResolvedValueOnce(true);
        const result = await getConfigFile(
            workspaceRoot,
            projectRoot,
            configFile,
        );
        const expectedPath = join(workspaceRoot, projectRoot, configFile);
        expect(result).toBe(expectedPath);
    });

    it('should return config file from root if in project it does not exist', async () => {
        fileExistsMock.mockResolvedValueOnce(false);
        fileExistsMock.mockResolvedValueOnce(true);
        const result = await getConfigFile(
            workspaceRoot,
            projectRoot,
            configFile,
        );
        const expectedPath = join(workspaceRoot, configFile);
        expect(result).toBe(expectedPath);
    });

    it('should error if config file does not exist', async () => {
        fileExistsMock.mockResolvedValueOnce(false);
        fileExistsMock.mockResolvedValueOnce(false);
        await expect(
            getConfigFile(workspaceRoot, projectRoot, configFile),
        ).rejects.toThrowError(
            `Could not find .clang-format. Please generate a preset using nx-cmake:init or provide your own.`,
        );
    });
});
