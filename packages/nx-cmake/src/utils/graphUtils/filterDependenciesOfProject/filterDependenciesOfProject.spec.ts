import { WorkspaceLayout } from '../../../models/types';
import {
    getFileName,
    getFilterCommand,
    getGtestInclude,
    getCmockaInclude,
    detectTestFramework,
    messageIncludesGtest,
    messageIncludesCmocka,
    getWorkspaceIncludeDir,
} from './filterDependenciesOfProject';

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

describe('getFilterCommand', () => {
    it('should generate the correct filter command', () => {
        const fileName = 'testfile.c';
        const projectRoot = 'projectA';
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getFilterCommand(fileName, projectRoot, workspaceLayout);
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
