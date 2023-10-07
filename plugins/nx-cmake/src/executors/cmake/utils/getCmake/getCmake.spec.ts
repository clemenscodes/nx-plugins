import { getCmake } from './getCmake';
import { DARWIN_CMAKE, WINDOWS_CMAKE, LINUX_CMAKE } from '@/config';
import * as fileExistsModule from '@/file/lib/fileExists/fileExists';
import * as isDarwinModule from '@/utils/lib/isDarwin/isDarwin';
import * as isWindowsModule from '@/utils/lib/isWindows/isWindows';

describe('getCmake', () => {
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;
    let fileExistsMock: jest.SpyInstance;

    beforeEach(() => {
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(isDarwinModule, 'isDarwin')
            .mockReturnValue(false);
        fileExistsMock = jest
            .spyOn(fileExistsModule, 'fileExists')
            .mockReturnValue(true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get cmake on linux', () => {
        const cmake = getCmake();
        expect(cmake).toBe(LINUX_CMAKE);
    });

    it('should get cmake on darwin', () => {
        isDarwinMock.mockReturnValue(true);
        const cmake = getCmake();
        expect(cmake).toBe(DARWIN_CMAKE);
    });

    it('should get cmake on windows', () => {
        isWindowsMock.mockReturnValue(true);
        const cmake = getCmake();
        expect(cmake).toBe(WINDOWS_CMAKE);
    });

    it('should error getting the program path when it doesnt exist', () => {
        fileExistsMock.mockReturnValue(false);
        expect(() => getCmake()).toThrowError(
            `cmake was not found at expected path ${LINUX_CMAKE}`,
        );
    });
});
