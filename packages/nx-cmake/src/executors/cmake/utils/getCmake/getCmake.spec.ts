import * as isDarwinModule from '../../../../utils/pluginUtils/isDarwin/isDarwin';
import * as isWindowsModule from '../../../../utils/pluginUtils/isWindows/isWindows';
import { getCmake } from './getCmake';
import {
    DARWIN_CMAKE,
    WINDOWS_CMAKE,
    LINUX_CMAKE,
} from '../../../../config/programs';

describe('getCmake', () => {
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;

    beforeEach(() => {
        isWindowsMock = jest.spyOn(isWindowsModule, 'isWindows');
        isDarwinMock = jest.spyOn(isDarwinModule, 'isDarwin');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get cmake on linux', () => {
        isDarwinMock.mockReturnValueOnce(false);
        isWindowsMock.mockReturnValueOnce(false);
        const cmake = getCmake();
        expect(cmake).toBe(LINUX_CMAKE);
    });

    it('should get cmake on darwin', () => {
        isDarwinMock.mockReturnValueOnce(true);
        isWindowsMock.mockReturnValueOnce(false);
        const cmake = getCmake();
        expect(cmake).toBe(DARWIN_CMAKE);
    });

    it('should get cmake on windows', () => {
        isDarwinMock.mockReturnValueOnce(false);
        isWindowsMock.mockReturnValueOnce(true);
        const cmake = getCmake();
        expect(cmake).toBe(WINDOWS_CMAKE);
    });
});
