import { getGcc } from './getGcc';
import { LINUX_GCC, DARWIN_GCC, WINDOWS_GCC, GCC } from '../getPrograms';
import * as fileModule from '@/file';
import * as utilsModule from '@/util';

describe('getGcc', () => {
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

    it('should get GCC on Linux', () => {
        fileExistsMock.mockReturnValue(true);
        const gcc = getGcc();
        expect(gcc).toBe(LINUX_GCC[0]);
    });

    it('should get GCC on Darwin', () => {
        fileExistsMock.mockReturnValue(true);
        isDarwinMock.mockReturnValue(true);
        const gcc = getGcc();
        expect(gcc).toBe(DARWIN_GCC[0]);
    });

    it('should get GCC on Windows', () => {
        fileExistsMock.mockReturnValue(true);
        isWindowsMock.mockReturnValue(true);
        const gcc = getGcc();
        expect(gcc).toBe(WINDOWS_GCC[0]);
    });

    it('should error getting the program path when it doesnt exist', () => {
        fileExistsMock.mockReturnValue(false);
        const gcc = getGcc();
        expect(gcc).toBe(GCC);
    });
});
