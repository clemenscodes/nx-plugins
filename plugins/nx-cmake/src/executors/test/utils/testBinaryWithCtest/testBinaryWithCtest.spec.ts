import type { TestExecutorSchema } from '../../schema';
import { LINUX_CTEST } from '@/config';
import { testBinaryWithCtest } from './testBinaryWithCtest';
import * as runCommandModule from '@/command/lib/runCommand/runCommand';
import * as checkCommandExistsModule from '@/command/lib/checkCommandExists/checkCommandExists';
import * as fileExistsModule from '@/file/lib/fileExists/fileExists';
import * as isDarwinModule from '@/utils/lib/isDarwin/isDarwin';
import * as isWindowsModule from '@/utils/lib/isWindows/isWindows';
import * as getCtestModule from '../getCtest/getCtest';

describe('buildProjectWithMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let runCommandMock: jest.SpyInstance;
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
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        jest.spyOn(fileExistsModule, 'fileExists').mockReturnValue(true);
        jest.spyOn(getCtestModule, 'getCtest').mockReturnValue(LINUX_CTEST[0]);
        checkCommandExistsMock = jest
            .spyOn(checkCommandExistsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(isDarwinModule, 'isDarwin')
            .mockReturnValue(false);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should test binary with ctest and return true', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith('ctest');
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            '-C Debug',
            '--output-on-failure',
            `--test-dir=${workspaceRoot}/dist/${projectRoot}`,
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
        expect(checkCommandExistsMock).toHaveBeenCalledWith('ctest');
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to ctest', () => {
        isDarwinMock.mockReturnValue(true);
        runCommandMock.mockReturnValue({ success: true });
        options.args = ['-ex', 'run', '--arg1', 'value1'];
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith('ctest');
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            '-C Debug',
            '--output-on-failure',
            `--test-dir=${workspaceRoot}/dist/${projectRoot}`,
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
        runCommandMock.mockReturnValue({ success: false });
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith('ctest');
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            '-C Debug',
            `--test-dir=${workspaceRoot}/dist/${projectRoot}`,
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
