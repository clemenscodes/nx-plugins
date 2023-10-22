import { CompileExecutorSchema, LINUX_CMAKE } from '@/config';
import { compileProjectWithCMake } from './compileProjectWithCMake';
import { join } from 'path';
import * as fileModule from '@/file';
import * as configModule from '@/config';
import * as utilsModule from '@/util';

describe('compileProjectWithCMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: CompileExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let getCmakeMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = 'workspaceRoot';
        projectRoot = 'projectRoot';
        options = {
            args: [],
            release: false,
        };
        runCommandMock = jest.spyOn(utilsModule, 'runCommand');
        getCmakeMock = jest.spyOn(configModule, 'getCmake');
        jest.spyOn(fileModule, 'fileExists').mockReturnValue(true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should error if cmake is not installed', () => {
        getCmakeMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            compileProjectWithCMake(workspaceRoot, projectRoot, options),
        ).toThrowError();
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should call runCommand with the correct arguments', () => {
        options.release = true;
        runCommandMock.mockReturnValue({ success: true });
        getCmakeMock.mockReturnValue(LINUX_CMAKE);
        compileProjectWithCMake(workspaceRoot, projectRoot, options);
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CMAKE,
            '--build',
            join(`${workspaceRoot}/dist/${projectRoot}`),
            '--config=Release',
            ...options.args,
        );
    });

    it('should return true if runCommand succeeds', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = compileProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(true);
    });

    it('should return false if runCommand fails', () => {
        runCommandMock.mockReturnValue({ success: false });
        const result = compileProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(false);
    });
});
