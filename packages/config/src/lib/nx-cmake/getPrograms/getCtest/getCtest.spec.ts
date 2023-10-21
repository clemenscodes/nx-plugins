import { getCtest } from './getCtest';
import * as fileModule from '@/file';
import * as isWindowsModule from '../../../isWindows/isWindows';
import * as isDarwinModule from '../../../isDarwin/isDarwin';
import {
    LINUX_CTEST,
    DARWIN_CTEST,
    WINDOWS_CTEST,
    CTEST,
} from '../getPrograms';

describe('getCtest', () => {
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
        fileExistsMock = jest.spyOn(fileModule, 'fileExists');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get ctest on Linux', () => {
        fileExistsMock.mockReturnValue(true);
        const ctest = getCtest();
        expect(ctest).toBe(LINUX_CTEST[0]);
    });

    it('should get ctest on Darwin', () => {
        fileExistsMock.mockReturnValue(true);
        isDarwinMock.mockReturnValue(true);
        const ctest = getCtest();
        expect(ctest).toBe(DARWIN_CTEST[0]);
    });

    it('should get ctest on Windows', () => {
        fileExistsMock.mockReturnValue(true);
        isWindowsMock.mockReturnValue(true);
        const ctest = getCtest();
        expect(ctest).toBe(WINDOWS_CTEST[0]);
    });

    it('should error getting the program path when it doesnt exist', () => {
        fileExistsMock.mockReturnValue(false);
        expect(() => getCtest()).toThrowError(
            `${CTEST} was not found on paths ${LINUX_CTEST}`,
        );
    });
});
