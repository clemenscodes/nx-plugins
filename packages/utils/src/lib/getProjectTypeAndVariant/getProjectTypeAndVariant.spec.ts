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
            'set(PROJECT_TYPE TEST)\n' + 'set(LANGUAGE C)';
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
});
