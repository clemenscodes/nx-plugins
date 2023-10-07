import { getProgram } from './getProgram';
import { LINUX_GCC, DARWIN_GCC, WINDOWS_GCC } from '@/config';
import * as fileExistsModule from '@/file/lib/fileExists/fileExists';
import * as isDarwinModule from '../isDarwin/isDarwin';
import * as isWindowsModule from '../isWindows/isWindows';
import { Program } from '@/types';

describe('getProgram', () => {
    let program: Program;
    let isDarwinMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;
    let fileExistsMock: jest.SpyInstance;
    let expectedProgram: string;

    beforeEach(() => {
        program = 'gcc';
        isDarwinMock = jest
            .spyOn(isDarwinModule, 'isDarwin')
            .mockReturnValue(false);
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        fileExistsMock = jest.spyOn(fileExistsModule, 'fileExists');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get linux gcc on linux when passing gcc', () => {
        fileExistsMock.mockReturnValue(true);
        expectedProgram = LINUX_GCC;
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on linux when passing gcc', () => {
        fileExistsMock.mockReturnValue(false);
        expect(() => getProgram(program)).toThrowError(
            `${program} was not found at expected path ${LINUX_GCC}`,
        );
    });

    it('should get darwin gcc on darwin when passing gcc', () => {
        isDarwinMock.mockReturnValue(true);
        fileExistsMock.mockReturnValue(true);
        expectedProgram = DARWIN_GCC;
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on darwin when passing gcc', () => {
        isDarwinMock.mockReturnValue(true);
        fileExistsMock.mockReturnValue(false);
        expect(() => getProgram(program)).toThrowError(
            `${program} was not found at expected path ${DARWIN_GCC}`,
        );
    });

    it('should get windows gcc on windows when passing gcc', () => {
        isWindowsMock.mockReturnValue(true);
        fileExistsMock.mockReturnValue(true);
        expectedProgram = WINDOWS_GCC;
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on windows when passing gcc', () => {
        isWindowsMock.mockReturnValue(true);
        fileExistsMock.mockReturnValue(false);
        expect(() => getProgram(program)).toThrowError(
            `${program} was not found at expected path ${WINDOWS_GCC}`,
        );
    });
});
