import { getGdb } from './getGdb';
import { LINUX_GDB, DARWIN_GDB, WINDOWS_GDB, GDB } from '../getPrograms';
import * as fileModule from '@/file';
import * as utilsModule from '@/util';

describe('getGdb', () => {
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

    it('should get GDB on Linux', () => {
        fileExistsMock.mockReturnValue(true);
        const gdb = getGdb();
        expect(gdb).toBe(LINUX_GDB[0]);
    });

    it('should get GDB on Darwin', () => {
        fileExistsMock.mockReturnValue(true);
        isDarwinMock.mockReturnValue(true);
        const gdb = getGdb();
        expect(gdb).toBe(DARWIN_GDB[0]);
    });

    it('should get GDB on Windows', () => {
        fileExistsMock.mockReturnValue(true);
        isWindowsMock.mockReturnValue(true);
        const gdb = getGdb();
        expect(gdb).toBe(WINDOWS_GDB[0]);
    });

    it('should error getting the program path when it doesnt exist', () => {
        fileExistsMock.mockReturnValue(false);
        const gdb = getGdb();
        expect(gdb).toBe(GDB);
    });
});
