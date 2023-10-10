import { CTEST, LINUX_CTEST, TestExecutorSchema } from '@/config';
import { testBinaryWithCtest } from './testBinaryWithCtest';
import { join } from 'path';
import * as fileModule from '@/file';
import * as runCommandModule from '../runCommand/runCommand';
import * as checkCommandExistsModule from '../checkCommandExists/checkCommandExists';
import * as configModule from '@/config';

describe('buildProjectWithCMake', () => {
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
        jest.spyOn(fileModule, 'fileExists').mockReturnValue(true);
        jest.spyOn(configModule, 'getCtest').mockReturnValue(LINUX_CTEST[0]);
        checkCommandExistsMock = jest
            .spyOn(checkCommandExistsModule, 'checkCommandExists')
            .mockImplementation(jest.fn());
        isWindowsMock = jest
            .spyOn(configModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(configModule, 'isDarwin')
            .mockReturnValue(false);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should test binary with ctest and return true', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith(CTEST);
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            '-C Debug',
            '--output-on-failure',
            `--test-dir=${join(workspaceRoot, 'dist', projectRoot)}`,
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
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to ctest', () => {
        isDarwinMock.mockReturnValue(true);
        runCommandMock.mockReturnValue({ success: true });
        options.args = ['-ex', 'run', '--arg1', 'value1'];
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith(CTEST);
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            '-C Debug',
            '--output-on-failure',
            `--test-dir=${join(workspaceRoot, 'dist', projectRoot)}`,
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
        expect(checkCommandExistsMock).toHaveBeenCalledWith(CTEST);
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CTEST[0],
            '-C Debug',
            `--test-dir=${join(workspaceRoot, 'dist', projectRoot)}`,
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
