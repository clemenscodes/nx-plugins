import {
    LINUX_CLANG_TIDY,
    DARWIN_CLANG_TIDY,
    WINDOWS_CLANG_TIDY,
    CLANG_TIDY,
} from '../getPrograms';
import { getClangTidy } from './getClangTidy';
import * as fileModule from '@/file';
import * as utilsModule from '@/util';

describe('getClangTidy', () => {
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

    it('should get clang-tidy on Linux', () => {
        fileExistsMock.mockReturnValue(true);
        const clangTidy = getClangTidy();
        expect(clangTidy).toBe(LINUX_CLANG_TIDY[0]);
    });

    it('should get clang-tidy on Darwin', () => {
        fileExistsMock.mockReturnValue(true);
        isDarwinMock.mockReturnValue(true);
        const clangTidy = getClangTidy();
        expect(clangTidy).toBe(DARWIN_CLANG_TIDY[0]);
    });

    it('should get clang-tidy on Windows', () => {
        fileExistsMock.mockReturnValue(true);
        isWindowsMock.mockReturnValue(true);
        const clangTidy = getClangTidy();
        expect(clangTidy).toBe(WINDOWS_CLANG_TIDY[0]);
    });

    it('should error getting the program path when it doesnt exist', () => {
        fileExistsMock.mockReturnValue(false);
        const clangTidy = getClangTidy();
        expect(clangTidy).toBe(CLANG_TIDY);
    });
});
