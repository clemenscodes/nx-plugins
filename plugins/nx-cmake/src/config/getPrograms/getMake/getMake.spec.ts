import { getMake } from './getMake';
import { LINUX_MAKE, DARWIN_MAKE, WINDOWS_MAKE, MAKE } from '../getPrograms';
import * as fileModule from '@/file';
import * as utilsModule from '@/util';

describe('getMake', () => {
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

    it('should get Make on Linux', () => {
        fileExistsMock.mockReturnValue(true);
        const make = getMake();
        expect(make).toBe(LINUX_MAKE[0]);
    });

    it('should get Make on Darwin', () => {
        fileExistsMock.mockReturnValue(true);
        isDarwinMock.mockReturnValue(true);
        const make = getMake();
        expect(make).toBe(DARWIN_MAKE[0]);
    });

    it('should get Make on Windows', () => {
        fileExistsMock.mockReturnValue(true);
        isWindowsMock.mockReturnValue(true);
        const make = getMake();
        expect(make).toBe(WINDOWS_MAKE[0]);
    });

    it('should error getting the program path when it doesnt exist', () => {
        fileExistsMock.mockReturnValue(false);
        const make = getMake();
        expect(make).toBe(MAKE);
    });
});
