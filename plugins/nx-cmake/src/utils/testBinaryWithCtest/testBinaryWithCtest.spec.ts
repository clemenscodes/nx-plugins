import { testBinaryWithCtest } from './testBinaryWithCtest';
import { join } from 'path';
import * as fileModule from '@/file';
import * as utilsModule from '@/util';
import * as getCtestModule from '../../config/getPrograms/getCtest/getCtest';
import { LINUX_CTEST, CTEST } from '../../config';
import { TestExecutorSchema } from '../../executors/executor';

describe('buildProjectWithCMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let runCommandFromDirectoryMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let options: TestExecutorSchema;
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = '/workspace';
        projectRoot = 'projectRoot';
        options = {
            args: [],
            release: false,
            outputOnFailure: true,
        };
        runCommandFromDirectoryMock = jest.spyOn(
            utilsModule,
            'runCommandFromDirectory',
        );
        jest.spyOn(fileModule, 'fileExists').mockReturnValue(true);
        jest.spyOn(getCtestModule, 'getCtest').mockReturnValue(LINUX_CTEST[0]);
        checkCommandExistsMock = jest
            .spyOn(utilsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        isWindowsMock = jest
            .spyOn(utilsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(utilsModule, 'isDarwin')
            .mockReturnValue(false);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should test binary with ctest and return true', () => {
        runCommandFromDirectoryMock.mockReturnValue({ success: true });
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith(CTEST);
        expect(runCommandFromDirectoryMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            join(workspaceRoot, 'dist', projectRoot),
            '-C Debug',
            '--output-on-failure',
            ...options.args,
        );
        expect(result).toBe(true);
    });

    it('should error if ctest is not installed', () => {
        checkCommandExistsMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            testBinaryWithCtest(workspaceRoot, projectRoot, options),
        ).toThrowError();
        expect(checkCommandExistsMock).toHaveBeenCalledWith(CTEST);
        expect(runCommandFromDirectoryMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to ctest', () => {
        isDarwinMock.mockReturnValue(true);
        runCommandFromDirectoryMock.mockReturnValue({ success: true });
        options.args = ['-ex', 'run', '--arg1', 'value1'];
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith(CTEST);
        expect(runCommandFromDirectoryMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            join(workspaceRoot, 'dist', projectRoot),
            '-C Debug',
            '--output-on-failure',
            '-ex',
            'run',
            '--arg1',
            'value1',
        );
        expect(result).toBe(true);
    });

    it('should return false if ctest failed', () => {
        isWindowsMock.mockReturnValue(true);
        options.outputOnFailure = false;
        runCommandFromDirectoryMock.mockReturnValue({ success: false });
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith(CTEST);
        expect(runCommandFromDirectoryMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            join(workspaceRoot, 'dist', projectRoot),
            '-C Debug',
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
