import { CProjectType } from '@/config';
import { getProjectTypeAndVariant } from './getProjectTypeAndVariant';
import * as fs from 'fs';

describe('getProjectType', () => {
    let readFileSyncMock: jest.SpyInstance;
    let mockProjectConfigFileContent: string;
    let mockProjectConfigFile: string;

    beforeEach(() => {
        mockProjectConfigFile = 'some-directory/CMakeLists.txt';
        mockProjectConfigFileContent =
            'project(whatever C)\n' + 'enable_testing()';
        readFileSyncMock = jest.spyOn(fs, 'readFileSync');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return test project type and c variant', () => {
        readFileSyncMock.mockReturnValue(mockProjectConfigFileContent);
        expect(getProjectTypeAndVariant(mockProjectConfigFile)).toStrictEqual([
            CProjectType.Test,
            'C',
        ]);
    });

    it('should return the app type and c language variant', () => {
        mockProjectConfigFileContent =
            'project(whatever CXX)\n' + 'set_binary_settings()';
        readFileSyncMock.mockReturnValue(mockProjectConfigFileContent);
        expect(getProjectTypeAndVariant(mockProjectConfigFile)).toStrictEqual([
            CProjectType.App,
            'C++',
        ]);
    });

    it('should return lib type and c language variant', () => {
        mockProjectConfigFileContent =
            'project(whatever CXX)\n' + 'set_library_settings()';
        readFileSyncMock.mockReturnValue(mockProjectConfigFileContent);
        expect(getProjectTypeAndVariant(mockProjectConfigFile)).toStrictEqual([
            CProjectType.Lib,
            'C++',
        ]);
    });

    it('should throw an error for an invalid project configuration file', () => {
        mockProjectConfigFile = 'invalid_project_config.txt';
        expect(() =>
            getProjectTypeAndVariant(mockProjectConfigFile),
        ).toThrowError(
            `Failed to determine project type or variant for the configuration file ${mockProjectConfigFile}`,
        );
    });
});
