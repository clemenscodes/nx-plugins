import {
    LINUX_CLANG_FORMAT,
    DARWIN_CLANG_FORMAT,
    WINDOWS_CLANG_FORMAT,
    CLANG_FORMAT,
} from '../getPrograms';
import { getClangFormat } from './getClangFormat';
import * as fileModule from '@/file';
import * as utilsModule from '@/util';

describe('getClangFormat', () => {
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;
    let fileExistsMock: jest.SpyInstance;

    beforeEach(() => {
        isWindowsMock = jest
            .spyOn(utilsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(utilsModule, 'isDarwin')
            .mockReturnValue(false);
        fileExistsMock = jest.spyOn(fileModule, 'fileExists');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get clang-format on Linux', () => {
        fileExistsMock.mockReturnValue(true);
        const clangFormat = getClangFormat();
        expect(clangFormat).toBe(LINUX_CLANG_FORMAT[0]);
    });

    it('should get clang-format on Darwin', () => {
        fileExistsMock.mockReturnValue(true);
        isDarwinMock.mockReturnValue(true);
        const clangFormat = getClangFormat();
        expect(clangFormat).toBe(DARWIN_CLANG_FORMAT[0]);
    });

    it('should get clang-format on Windows', () => {
        fileExistsMock.mockReturnValue(true);
        isWindowsMock.mockReturnValue(true);
        const clangFormat = getClangFormat();
        expect(clangFormat).toBe(WINDOWS_CLANG_FORMAT[0]);
    });

    it('should error getting the program path when it doesnt exist', () => {
        fileExistsMock.mockReturnValue(false);
        expect(() => getClangFormat()).toThrowError(
            `${CLANG_FORMAT} was not found on paths ${LINUX_CLANG_FORMAT}`,
        );
    });
});
