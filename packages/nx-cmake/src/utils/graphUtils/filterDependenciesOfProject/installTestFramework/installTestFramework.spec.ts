import { installTestFramework } from './installTestFramework';
import * as executeCommandModule from '../../../commandUtils/executeCommand/executeCommand';
import * as runCommandModule from '../../../commandUtils/runCommand/runCommand';

describe('installTestFramework', () => {
    let runCommandSpy: jest.SpyInstance;
    let executeCommandSpy: jest.SpyInstance;

    beforeEach(() => {
        runCommandSpy = jest.spyOn(runCommandModule, 'runCommand');
        executeCommandSpy = jest.spyOn(executeCommandModule, 'executeCommand');
    });

    afterEach(() => {
        runCommandSpy.mockRestore();
        executeCommandSpy.mockRestore();
    });

    it('should install the test framework and return stdout', () => {
        const workspaceRoot = '/workspace/root';
        const projectRoot = 'project-root';
        const cmd = 'test-command';
        runCommandSpy.mockReturnValue('');
        executeCommandSpy.mockReturnValue('Some output');
        const result = installTestFramework(workspaceRoot, projectRoot, cmd);
        expect(result).toBe('Some output');
        expect(runCommandSpy).toHaveBeenCalledWith(
            'cmake',
            '-S',
            '/workspace/root/project-root',
            '/workspace/root/dist/project-root',
        );
        expect(executeCommandSpy).toHaveBeenCalledWith(cmd);
    });

    it('should throw an error if stdout is empty', () => {
        const workspaceRoot = '/workspace/root';
        const projectRoot = 'project-root';
        const cmd = 'test-command';
        runCommandSpy.mockReturnValue('');
        executeCommandSpy.mockReturnValue('');
        expect(() =>
            installTestFramework(workspaceRoot, projectRoot, cmd),
        ).toThrowError('Failed process dependencies');
    });
});
