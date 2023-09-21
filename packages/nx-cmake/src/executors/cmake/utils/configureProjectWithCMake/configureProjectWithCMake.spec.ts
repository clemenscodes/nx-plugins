import type { CmakeExecutorSchema } from '../../schema';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import { configureProjectWithCMake } from './configureProjectWithCMake';

describe('buildProjectWithMake', () => {
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let options: CmakeExecutorSchema;

    beforeEach(() => {
        options = {
            args: [],
            release: false,
        };

        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        checkCommandExistsMock = jest.spyOn(
            checkCommandExistsModule,
            'checkCommandExists'
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should configure project with cmake and return true', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = configureProjectWithCMake(
            'workspaceRoot',
            'projectRoot',
            options
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).toHaveBeenCalledWith(
            'cmake',
            '-S',
            'workspaceRoot/projectRoot',
            'workspaceRoot/dist/projectRoot',
            '-DCMAKE_BUILD_TYPE=Debug',
            ...options.args
        );
        expect(result).toBe(true);
    });

    it('should error if cmake is not installed', () => {
        checkCommandExistsMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            configureProjectWithCMake('workspaceRoot', 'projectRoot', options)
        ).toThrowError();
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to cmake', () => {
        runCommandMock.mockReturnValue({ success: true });
        options.args = ['--arg1', '--arg2'];
        const result = configureProjectWithCMake(
            'workspaceRoot',
            'projectRoot',
            options
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).toHaveBeenCalledWith(
            'cmake',
            '-S',
            'workspaceRoot/projectRoot',
            'workspaceRoot/dist/projectRoot',
            '-DCMAKE_BUILD_TYPE=Debug',
            '--arg1',
            '--arg2'
        );
        expect(result).toBe(true);
    });

    it('should return false if cmake failed', () => {
        runCommandMock.mockReturnValue({ success: false });
        const result = configureProjectWithCMake(
            'workspaceRoot',
            'projectRoot',
            options
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).toHaveBeenCalledWith(
            'cmake',
            '-S',
            'workspaceRoot/projectRoot',
            'workspaceRoot/dist/projectRoot',
            '-DCMAKE_BUILD_TYPE=Debug',
            ...options.args
        );
        expect(result).toBe(false);
    });
});
