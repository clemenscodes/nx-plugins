import { getGccDependencies } from './getGccDependencies';
import * as detectTestFrameworkModule from '../detectTestFramework/detectTestFramework';
import * as installTestFrameworkModule from '../installTestFramework/installTestFramework';
import * as utilsModule from '@/utils';

describe('getGccDependencies', () => {
    let executeCommandSpy: jest.SpyInstance;
    let detectTestFrameworkSpy: jest.SpyInstance;
    let installTestFrameworkSpy: jest.SpyInstance;
    let loggerMock: jest.SpyInstance;
    let cmd: string;
    let projectRoot: string;
    let workspaceRoot: string;

    beforeEach(() => {
        cmd = 'gcc-command';
        projectRoot = 'project-root';
        workspaceRoot = '/workspace/root';
        executeCommandSpy = jest.spyOn(utilsModule, 'executeCommand');
        detectTestFrameworkSpy = jest.spyOn(
            detectTestFrameworkModule,
            'detectTestFramework',
        );
        installTestFrameworkSpy = jest.spyOn(
            installTestFrameworkModule,
            'installTestFramework',
        );
        loggerMock = jest.spyOn(utilsModule, 'logger');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return GCC dependencies if no test framework detected', () => {
        executeCommandSpy.mockReturnValue('Some output');
        const result = getGccDependencies(cmd, projectRoot, workspaceRoot);
        expect(result).toBe('Some output');
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
        expect(installTestFrameworkSpy).not.toHaveBeenCalled();
    });

    it('should rethrow the error and log it if no test framework is detected', () => {
        const mockErrorMessage = 'Some error';
        const mockError = new Error(mockErrorMessage);
        executeCommandSpy.mockImplementation(() => {
            throw mockError;
        });
        detectTestFrameworkSpy.mockReturnValue(false);
        expect(() =>
            getGccDependencies(cmd, projectRoot, workspaceRoot),
        ).toThrowError(mockErrorMessage);
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
        expect(loggerMock).toHaveBeenCalledWith(JSON.stringify(mockError));
        expect(installTestFrameworkSpy).not.toHaveBeenCalled();
    });

    it('should install test framework and return stdout if test framework detected', () => {
        executeCommandSpy.mockImplementation(() => {
            throw new Error('Some error');
        });
        detectTestFrameworkSpy.mockReturnValue(true);
        installTestFrameworkSpy.mockReturnValue('Test framework output');
        const result = getGccDependencies(cmd, projectRoot, workspaceRoot);
        expect(result).toBe('Test framework output');
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
        expect(detectTestFrameworkSpy).toHaveBeenCalledWith('Some error');
        expect(installTestFrameworkSpy).toHaveBeenCalledWith(
            workspaceRoot,
            projectRoot,
            cmd,
        );
    });

    it('should throw the error if it is not an instance of Error', () => {
        const nonError = { someProperty: 'someValue' };
        executeCommandSpy.mockImplementation(() => {
            throw nonError;
        });
        let thrownError: unknown;
        try {
            getGccDependencies(cmd, projectRoot, workspaceRoot);
        } catch (e) {
            thrownError = e;
        }
        expect(thrownError).toBe(nonError);
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
        expect(detectTestFrameworkSpy).not.toHaveBeenCalled();
        expect(installTestFrameworkSpy).not.toHaveBeenCalled();
    });
});
