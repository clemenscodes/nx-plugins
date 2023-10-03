import type { TestExecutorSchema } from '../../schema';
import { testBinaryWithCtest } from './testBinaryWithCtest';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

describe('buildProjectWithMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let options: TestExecutorSchema;

    beforeEach(() => {
        workspaceRoot = '/workspace';
        projectRoot = 'projectRoot';
        options = {
            args: [],
            release: false,
        };

        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        checkCommandExistsMock = jest.spyOn(
            checkCommandExistsModule,
            'checkCommandExists',
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should test binary with ctest and return true', () => {
        checkCommandExistsMock.mockReturnValue('ctest');
        runCommandMock.mockReturnValue({ success: true });
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith('ctest');
        expect(runCommandMock).toHaveBeenCalledWith(
            'ctest',
            '-C Debug',
            '--output-on-failure',
            '--test-dir',
            `${workspaceRoot}/dist/${projectRoot}`,
            ...options.args,
        );
        expect(result).toBe(true);
    });

    it('should error if ctest is not installed', () => {
        checkCommandExistsMock.mockImplementationOnce(() => {
            throw new Error();
        });
        expect(() =>
            testBinaryWithCtest(workspaceRoot, projectRoot, options),
        ).toThrowError();
        expect(checkCommandExistsMock).toHaveBeenCalledWith('ctest');
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to ctest', () => {
        checkCommandExistsMock.mockReturnValue('ctest');
        runCommandMock.mockReturnValue({ success: true });
        options.args = ['-ex', 'run', '--arg1', 'value1'];
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith('ctest');
        expect(runCommandMock).toHaveBeenCalledWith(
            'ctest',
            '-C Debug',
            '--output-on-failure',
            '--test-dir',
            `${workspaceRoot}/dist/${projectRoot}`,
            '-ex',
            'run',
            '--arg1',
            'value1',
        );
        expect(result).toBe(true);
    });

    it('should return false if ctest failed', () => {
        checkCommandExistsMock.mockReturnValue('ctest');
        runCommandMock.mockReturnValue({ success: false });
        const result = testBinaryWithCtest(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith('ctest');
        expect(runCommandMock).toHaveBeenCalledWith(
            'ctest',
            '-C Debug',
            '--output-on-failure',
            '--test-dir',
            `${workspaceRoot}/dist/${projectRoot}`,
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
