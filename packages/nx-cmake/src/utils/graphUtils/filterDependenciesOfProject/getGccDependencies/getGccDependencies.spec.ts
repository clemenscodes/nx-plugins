import { getGccDependencies } from './getGccDependencies';
import * as detectTestFrameworkModule from '../detectTestFramework/detectTestFramework';
import * as installTestFrameworkModule from '../installTestFramework/installTestFramework';
import * as executeCommandModule from '../../../commandUtils/executeCommand/executeCommand';

describe('getGccDependencies', () => {
    let executeCommandSpy: jest.SpyInstance;
    let detectTestFrameworkSpy: jest.SpyInstance;
    let installTestFrameworkSpy: jest.SpyInstance;

    beforeEach(() => {
        executeCommandSpy = jest.spyOn(executeCommandModule, 'executeCommand');
        detectTestFrameworkSpy = jest.spyOn(
            detectTestFrameworkModule,
            'detectTestFramework'
        );
        installTestFrameworkSpy = jest.spyOn(
            installTestFrameworkModule,
            'installTestFramework'
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return GCC dependencies if no test framework detected', () => {
        const cmd = 'gcc-command';
        const projectRoot = 'project-root';
        const workspaceRoot = '/workspace/root';
        executeCommandSpy.mockReturnValue('Some output');
        detectTestFrameworkSpy.mockReturnValue(false);
        const result = getGccDependencies(cmd, projectRoot, workspaceRoot);
        expect(result).toBe('Some output');
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
        expect(installTestFrameworkSpy).not.toHaveBeenCalled();
    });

    it('should install test framework and return stdout if test framework detected', () => {
        const cmd = 'gcc-command';
        const projectRoot = 'project-root';
        const workspaceRoot = '/workspace/root';
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
            cmd
        );
    });
});
