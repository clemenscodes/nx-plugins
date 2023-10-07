import type { BuildExecutorSchema } from '../../schema';
import { LINUX_CMAKE } from '@/config';
import { buildProjectWithCMake } from './buildProjectWithCMake';
import * as runCommandModule from '@/command/lib/runCommand/runCommand';
import * as getCmakeModule from '../../../cmake/utils/getCmake/getCmake';
import * as fileExistsModule from '@/file/lib/fileExists/fileExists';

describe('buildProjectWithCMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: BuildExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let getCmakeMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = 'workspaceRoot';
        projectRoot = 'projectRoot';
        options = {
            args: [],
            release: false,
        };
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        getCmakeMock = jest.spyOn(getCmakeModule, 'getCmake');
        jest.spyOn(fileExistsModule, 'fileExists').mockReturnValue(true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should error if cmake is not installed', () => {
        getCmakeMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            buildProjectWithCMake(workspaceRoot, projectRoot, options),
        ).toThrowError();
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should call runCommand with the correct arguments', () => {
        options.release = true;
        runCommandMock.mockReturnValue({ success: true });
        getCmakeMock.mockReturnValue(LINUX_CMAKE);
        buildProjectWithCMake(workspaceRoot, projectRoot, options);
        expect(runCommandMock).toHaveBeenCalledWith(
            LINUX_CMAKE,
            '--build',
            `${workspaceRoot}/dist/${projectRoot}`,
            '--config=Release',
            ...options.args,
        );
    });

    it('should return true if runCommand succeeds', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = buildProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(true);
    });

    it('should return false if runCommand fails', () => {
        runCommandMock.mockReturnValue({ success: false });
        const result = buildProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(false);
    });
});
