import { CProjectType } from '@/types';
import { mockNxOutput } from '@/mocks';
import { getProjectTypeFromConfigFileContent } from './getProjectFileFromConfigFileContent';

describe('getProjectTypeFromConfigFileContent', () => {
    let content: string;
    let projectType: CProjectType;
    let nxErrorOutputMock: jest.SpyInstance;

    beforeEach(() => {
        projectType = CProjectType.Test;
        nxErrorOutputMock = mockNxOutput('error');
    });

    it('should return Test for content with enable_testing()', () => {
        content = `set(PROJECT_TYPE ${projectType})`;
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.Test,
        );
    });

    it('should return Lib for content with set_library_settings', () => {
        projectType = CProjectType.Lib;
        content = `set(PROJECT_TYPE ${projectType})`;
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.Lib,
        );
    });

    it('should return App for content with set_binary_settings', () => {
        projectType = CProjectType.App;
        content = `set(PROJECT_TYPE ${projectType})`;
        expect(getProjectTypeFromConfigFileContent(content)).toBe(
            CProjectType.App,
        );
    });

    it('should throw an error for unknown content', () => {
        content = 'set(PROJECT_TYPE INCORRECT)';
        nxErrorOutputMock.mockImplementation(jest.fn());
        expect(() =>
            getProjectTypeFromConfigFileContent(content),
        ).toThrowError();
        expect(nxErrorOutputMock).toHaveBeenCalledWith({
            title: 'Failed to determine project type from CMakeLists.txt',
            bodyLines: [
                'Please make sure to have set(PROJECT_TYPE <TEST|LIB|BIN>)',
            ],
        });
    });
});
