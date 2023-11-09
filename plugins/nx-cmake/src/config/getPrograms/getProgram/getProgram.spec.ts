import { getProgram } from './getProgram';
import {
    Program,
    GCC,
    LINUX_GCC,
    DARWIN_GCC,
    WINDOWS_GCC,
} from '../getPrograms';
import * as fileExistsModule from '@/file';
import * as utilsModule from '@/util';

describe('getProgram', () => {
    let program: Program;
    let isDarwinMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;
    let fileExistsMock: jest.SpyInstance;
    let expectedProgram: string;

    beforeEach(() => {
        program = GCC;
        isDarwinMock = jest
            .spyOn(utilsModule, 'isDarwin')
            .mockReturnValue(false);
        isWindowsMock = jest
            .spyOn(utilsModule, 'isWindows')
            .mockReturnValue(false);
        fileExistsMock = jest
            .spyOn(fileExistsModule, 'fileExists')
            .mockReturnValue(true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get linux gcc on linux when passing gcc', () => {
        expectedProgram = LINUX_GCC[0];
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on linux when passing gcc', () => {
        fileExistsMock.mockReturnValue(false);
        const result = getProgram(program);
        expect(result).toBe(program);
    });

    it('should get darwin gcc on darwin when passing gcc', () => {
        isDarwinMock.mockReturnValue(true);
        expectedProgram = DARWIN_GCC[0];
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on darwin when passing gcc', () => {
        isDarwinMock.mockReturnValue(true);
        fileExistsMock.mockReturnValue(false);
        const result = getProgram(program);
        expect(result).toBe(program);
    });

    it('should get windows gcc on windows when passing gcc', () => {
        isWindowsMock.mockReturnValue(true);
        expectedProgram = WINDOWS_GCC[0];
        const result = getProgram(program);
        expect(result).toBe(expectedProgram);
    });

    it('should error when program doesnt exist on windows when passing gcc', () => {
        isWindowsMock.mockReturnValue(true);
        fileExistsMock.mockReturnValue(false);
        const result = getProgram(program);
        expect(result).toBe(program);
    });
});
