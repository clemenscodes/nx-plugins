import { CProjectType } from '../../../models/types';
import { getProjectType } from './getProjectType';
import * as fs from 'fs';

describe('getProjectType', () => {
    let readFileSyncMock: jest.SpyInstance;

    beforeEach(() => {
        readFileSyncMock = jest.spyOn(fs, 'readFileSync');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the project type for a valid project configuration file', () => {
        const projectConfigurationFile = 'some-directory/CMakeLists.txt';
        const configFileContent = 'enable_testing()';
        readFileSyncMock.mockReturnValue(configFileContent);

        expect(getProjectType(projectConfigurationFile)).toBe(
            CProjectType.Test,
        );
    });

    it('should throw an error for an invalid project configuration file', () => {
        const projectConfigurationFile = 'invalid_project_config.txt';

        expect(() => getProjectType(projectConfigurationFile)).toThrowError(
            `Failed to determine project type for the configuration file ${projectConfigurationFile}`,
        );
    });
});
