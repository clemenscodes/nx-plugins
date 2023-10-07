import type { Program } from '@/config';
import { getProgram } from './getProgram';
import { LINUX_GCC, DARWIN_GCC, WINDOWS_GCC, GCC } from '@/config';
import * as fileExistsModule from '@/file/lib/fileExists/fileExists';
import * as isDarwinModule from '../isDarwin/isDarwin';
import * as isWindowsModule from '../isWindows/isWindows';

describe('getProgram', () => {
    let program: Program;
    let isDarwinMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;
    let fileExistsMock: jest.SpyInstance;
    let expectedProgram: string;

    beforeEach(() => {
        program = GCC;
        isDarwinMock = jest.spyOn(isDarwinModule, 'isDarwin');
        isWindowsMock = jest.spyOn(isWindowsModule, 'isWindows');
        fileExistsMock = jest.spyOn(fileExistsModule, 'fileExists');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get linux gcc on linux when passing gcc', () => {
        isDarwinMock.mockReturnValue(false);
        isWindowsMock.mockReturnValue(false);
        fileExistsMock.mockImplementationOnce(() => false);
        fileExistsMock.mockImplementationOnce(() => true);
        expectedProgram = LINUX_GCC[1];
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on linux when passing gcc', () => {
        isDarwinMock.mockReturnValue(false);
        isWindowsMock.mockReturnValue(false);
        fileExistsMock.mockImplementation(() => false);
        expect(() => getProgram(program)).toThrowError(
            `${program} was not found on paths ${LINUX_GCC}`,
        );
    });

    it('should get darwin gcc on darwin when passing gcc', () => {
        isDarwinMock.mockReturnValue(true);
        isWindowsMock.mockReturnValue(false);
        expectedProgram = DARWIN_GCC[0];
        fileExistsMock.mockImplementation(() => true);
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on darwin when passing gcc', () => {
        isDarwinMock.mockReturnValue(true);
        isWindowsMock.mockReturnValue(false);
        fileExistsMock.mockImplementation(() => false);
        expect(() => getProgram(program)).toThrowError(
            `${program} was not found on paths ${DARWIN_GCC}`,
        );
    });

    it('should get windows gcc on windows when passing gcc', () => {
        isDarwinMock.mockReturnValue(false);
        isWindowsMock.mockReturnValue(true);
        expectedProgram = WINDOWS_GCC[0];
        fileExistsMock.mockImplementation(() => true);
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on windows when passing gcc', () => {
        isDarwinMock.mockReturnValue(false);
        isWindowsMock.mockReturnValue(true);
        fileExistsMock.mockImplementation(() => false);
        expect(() => getProgram(program)).toThrowError(
            `${program} was not found on paths ${WINDOWS_GCC}`,
        );
    });
});
