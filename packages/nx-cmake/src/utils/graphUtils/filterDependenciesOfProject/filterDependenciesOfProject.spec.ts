import type { WorkspaceLayout } from '../../../models/types';
import {
    getFileName,
    getGtestInclude,
    getCmockaInclude,
    detectTestFramework,
    messageIncludesGtest,
    messageIncludesCmocka,
    getWorkspaceIncludeDir,
    getGccDependenciesCommand,
    getGccDependencies,
    installTestFramework,
} from './filterDependenciesOfProject';
import * as executeCommandModule from '../../commandUtils/executeCommand/executeCommand';
import * as filterDependenciesOfProjectModule from './filterDependenciesOfProject';
import * as runCommandModule from '../../commandUtils/runCommand/runCommand';

describe('getWorkspaceIncludeDir', () => {
    it('should return the workspace include directory', () => {
        const result = getWorkspaceIncludeDir();
        expect(result).toBe('include');
    });
});

describe('messageIncludesGtest', () => {
    it('should return true if message includes gtest', () => {
        const message = '#include <gtest/gtest.h>';
        expect(messageIncludesGtest(message)).toBe(true);
    });

    it('should return false if message does not include gtest', () => {
        const message = 'Some other message';
        expect(messageIncludesGtest(message)).toBe(false);
    });
});

describe('messageIncludesCmocka', () => {
    it('should return true if message includes cmocka', () => {
        const message = '#include <cmocka.h>';
        expect(messageIncludesCmocka(message)).toBe(true);
    });

    it('should return false if message does not include cmocka', () => {
        const message = 'Some other message';
        expect(messageIncludesCmocka(message)).toBe(false);
    });
});

describe('detectTestFramework', () => {
    it('should return true if message includes gtest', () => {
        const message = '#include <gtest/gtest.h>';
        expect(detectTestFramework(message)).toBe(true);
    });

    it('should return true if message includes cmocka', () => {
        const message = '#include <cmocka.h>';
        expect(detectTestFramework(message)).toBe(true);
    });

    it('should return false if message does not include gtest or cmocka', () => {
        const message = 'Some other message';
        expect(detectTestFramework(message)).toBe(false);
    });
});

describe('getGtestInclude', () => {
    it('should return the gtest include path', () => {
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getGtestInclude(workspaceLayout);
        expect(result).toBe(
            'dist/libs/gtest/googletest-src/googletest/include'
        );
    });
});

describe('getCmockaInclude', () => {
    it('should return the cmocka include path', () => {
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getCmockaInclude(workspaceLayout);
        expect(result).toBe('dist/libs/cmocka/cmocka-src/include');
    });
});

describe('getGccDependenciesCommand', () => {
    it('should generate the correct gcc dependency command', () => {
        const fileName = 'testfile.c';
        const projectRoot = 'projectA';
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout
        );
        const expectedCmd = `gcc -M ${fileName} -I projectA/include -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });
});

describe('getFileName', () => {
    it('should generate the correct file name', () => {
        const projectRoot = 'projectA';
        const name = 'testfile';
        const tag = 'c';
        const result = getFileName(projectRoot, name, tag);
        expect(result).toBe('projectA/src/testfile.c');
    });
});

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
            '/workspace/root/dist/project-root'
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
            installTestFramework(workspaceRoot, projectRoot, cmd)
        ).toThrowError('Failed process dependencies');
    });
});

describe('getGccDependencies', () => {
    let executeCommandSpy: jest.SpyInstance;
    let detectTestFrameworkSpy: jest.SpyInstance;
    let installTestFrameworkSpy: jest.SpyInstance;

    beforeEach(() => {
        executeCommandSpy = jest.spyOn(executeCommandModule, 'executeCommand');
        detectTestFrameworkSpy = jest.spyOn(
            filterDependenciesOfProjectModule,
            'detectTestFramework'
        );
        installTestFrameworkSpy = jest.spyOn(
            filterDependenciesOfProjectModule,
            'installTestFramework'
        );
    });

    afterEach(() => {
        executeCommandSpy.mockRestore();
        detectTestFrameworkSpy.mockRestore();
        installTestFrameworkSpy.mockRestore();
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
