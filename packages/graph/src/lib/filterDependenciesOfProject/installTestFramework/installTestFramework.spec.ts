import { installTestFramework } from './installTestFramework';
import { join } from 'path';
import * as utilsModule from '@/utils';

describe('installTestFramework', () => {
    let runCommandSpy: jest.SpyInstance;
    let executeCommandSpy: jest.SpyInstance;

    beforeEach(() => {
        runCommandSpy = jest.spyOn(utilsModule, 'runCommand');
        executeCommandSpy = jest.spyOn(utilsModule, 'executeCommand');
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
            join('/workspace/root/project-root'),
            join('/workspace/root/dist/project-root'),
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
