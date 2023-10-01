import type { BuildExecutorSchema } from '../../schema';
import { buildProjectWithCMake } from './buildProjectWithCMake';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

describe('buildProjectWithCMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: BuildExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = 'workspaceRoot';
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

    it('should call checkCommandExists with "make"', () => {
        runCommandMock.mockReturnValue({ success: true });
        buildProjectWithCMake(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
    });

    it('should error if cmake is not installed', () => {
        checkCommandExistsMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            buildProjectWithCMake(workspaceRoot, projectRoot, options),
        ).toThrowError();
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should call runCommand with the correct arguments', () => {
        options.release = true;
        runCommandMock.mockReturnValue({ success: true });
        buildProjectWithCMake(workspaceRoot, projectRoot, options);
        expect(runCommandMock).toHaveBeenCalledWith(
            'cmake',
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
