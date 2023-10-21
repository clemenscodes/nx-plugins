import { getConfigFile } from './getConfigFile';
import { join } from 'path';
import * as fileExistsModule from '../fileExists/fileExists';

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

    it('should return config file from project if it exists', () => {
        fileExistsMock.mockReturnValueOnce(true);
        const result = getConfigFile(workspaceRoot, projectRoot, configFile);
        const expectedPath = join(workspaceRoot, projectRoot, configFile);
        expect(result).toBe(expectedPath);
    });

    it('should return config file from root if in project it does not exist', () => {
        fileExistsMock.mockReturnValueOnce(false);
        fileExistsMock.mockReturnValueOnce(true);
        const result = getConfigFile(workspaceRoot, projectRoot, configFile);
        const expectedPath = join(workspaceRoot, configFile);
        expect(result).toBe(expectedPath);
    });

    it('should error if config file does not exist', () => {
        fileExistsMock.mockReturnValueOnce(false);
        fileExistsMock.mockReturnValueOnce(false);
        expect(() =>
            getConfigFile(workspaceRoot, projectRoot, configFile),
        ).toThrowError(
            `Could not find ${configFile}. Please generate a preset using nx-cmake:init or provide your own.`,
        );
    });
});
