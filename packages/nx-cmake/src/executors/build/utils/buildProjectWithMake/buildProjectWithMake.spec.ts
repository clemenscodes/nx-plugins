import type { BuildExecutorSchema } from '../../schema';
import { buildProjectWithMake } from './buildProjectWithMake';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

describe('buildProjectWithMake', () => {
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
        buildProjectWithMake(workspaceRoot, projectRoot, options);
        expect(checkCommandExistsMock).toHaveBeenCalledWith('make');
    });

    it('should error if make is not installed', () => {
        checkCommandExistsMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            buildProjectWithMake(workspaceRoot, projectRoot, options),
        ).toThrowError();
        expect(checkCommandExistsMock).toHaveBeenCalledWith('make');
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should call runCommand with the correct arguments', () => {
        runCommandMock.mockReturnValue({ success: true });
        buildProjectWithMake(workspaceRoot, projectRoot, options);
        expect(runCommandMock).toHaveBeenCalledWith(
            'make',
            '-C',
            `${workspaceRoot}/dist/${projectRoot}`,
            ...options.args,
        );
    });

    it('should return true if runCommand succeeds', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = buildProjectWithMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(true);
    });

    it('should return false if runCommand fails', () => {
        runCommandMock.mockReturnValue({ success: false });
        const result = buildProjectWithMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(result).toBe(false);
    });
});
