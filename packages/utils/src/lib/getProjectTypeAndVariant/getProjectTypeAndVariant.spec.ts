import { CProjectType } from '@/config';
import { getProjectTypeAndVariant } from './getProjectTypeAndVariant';
import { output } from '@nx/devkit';
import * as fs from 'fs';

describe('getProjectType', () => {
    let readFileSyncMock: jest.SpyInstance;
    let mockProjectConfigFileContent: string;
    let mockProjectConfigFile: string;
    let nxErrorOutputMock: jest.SpyInstance;

    beforeEach(() => {
        mockProjectConfigFile = 'some-directory/CMakeLists.txt';
        mockProjectConfigFileContent =
            'set(PROJECT_TYPE TEST)\n' + 'set(LANGUAGE C)';
        readFileSyncMock = jest.spyOn(fs, 'readFileSync');
        nxErrorOutputMock = jest.spyOn(output, 'error');
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
            'set(PROJECT_TYPE BIN)\n' + 'set(LANGUAGE CXX)';
        readFileSyncMock.mockReturnValue(mockProjectConfigFileContent);
        expect(getProjectTypeAndVariant(mockProjectConfigFile)).toStrictEqual([
            CProjectType.App,
            'C++',
        ]);
    });

    it('should return lib type and c language variant', () => {
        mockProjectConfigFileContent =
            'set(PROJECT_TYPE LIB)\n' + 'set(LANGUAGE CXX)';
        readFileSyncMock.mockReturnValue(mockProjectConfigFileContent);
        expect(getProjectTypeAndVariant(mockProjectConfigFile)).toStrictEqual([
            CProjectType.Lib,
            'C++',
        ]);
    });

    it('should throw an error for an invalid project configuration file', () => {
        mockProjectConfigFile = 'invalid_project_config.txt';
        'set(PROJECT_TYPE INCORRECT)\n' + 'set(LANGUAGE CXX)';
        nxErrorOutputMock.mockImplementation(jest.fn());
        expect(() =>
            getProjectTypeAndVariant(mockProjectConfigFile),
        ).toThrowError();
        expect(nxErrorOutputMock).toHaveBeenCalledWith({
            title: `Failed to determine project type or variant for the configuration file ${mockProjectConfigFile}`,
        });
    });
});
