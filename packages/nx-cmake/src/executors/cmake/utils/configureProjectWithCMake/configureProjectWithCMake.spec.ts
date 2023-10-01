import type { CmakeExecutorSchema } from '../../schema';
import { configureProjectWithCMake } from './configureProjectWithCMake';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import * as isWindowsModule from '../../../../utils/pluginUtils/isWindows/isWindows';
import * as getCompilerModule from '../../../../utils/pluginUtils/getCompiler/getCompiler';
describe('buildProjectWithMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: CmakeExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let isWindowsMock: jest.SpyInstance;
    let getCompilerMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = 'workspaceRoot';
        projectRoot = 'projectRoot';
        options = {
            args: [],
            release: false,
        };

        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        checkCommandExistsMock = jest
            .spyOn(checkCommandExistsModule, 'checkCommandExists')
            .mockReturnValueOnce('cmake');
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        getCompilerMock = jest
            .spyOn(getCompilerModule, 'getCompiler')
            .mockReturnValue('gcc');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should configure project with cmake and return true', () => {
        runCommandMock.mockReturnValue({ success: true });
        const result = configureProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).toHaveBeenCalledWith(
            'cmake',
            '-S',
            `${workspaceRoot}/${projectRoot}`,
            `${workspaceRoot}/dist/${projectRoot}`,
            '-G "Unix Makefiles"',
            '-DCMAKE_C_COMPILER=gcc',
            '-DCMAKE_CXX_COMPILER=gcc',
            '-DCMAKE_BUILD_TYPE=Debug',
            ...options.args,
        );
        expect(result).toBe(true);
    });

    it('should error if cmake is not installed', () => {
        checkCommandExistsMock.mockReset();
        checkCommandExistsMock.mockImplementation(() => {
            throw new Error();
        });
        expect(() =>
            configureProjectWithCMake(workspaceRoot, projectRoot, options),
        ).toThrowError();
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).not.toHaveBeenCalled();
    });

    it('should pass arguments to cmake', () => {
        runCommandMock.mockReturnValue({ success: true });
        options.args = ['--arg1', '--arg2'];
        const result = configureProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).toHaveBeenCalledWith(
            'cmake',
            '-S',
            `${workspaceRoot}/${projectRoot}`,
            `${workspaceRoot}/dist/${projectRoot}`,
            '-G "Unix Makefiles"',
            '-DCMAKE_C_COMPILER=gcc',
            '-DCMAKE_CXX_COMPILER=gcc',
            '-DCMAKE_BUILD_TYPE=Debug',
            '--arg1',
            '--arg2',
        );
        expect(result).toBe(true);
    });

    it('should return false if cmake failed', () => {
        isWindowsMock.mockReturnValue(true);
        getCompilerMock.mockReturnValueOnce('gcc-13');
        runCommandMock.mockReturnValue({ success: false });
        const result = configureProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith('cmake');
        expect(runCommandMock).toHaveBeenCalledWith(
            'cmake',
            '-S',
            `${workspaceRoot}/${projectRoot}`,
            `${workspaceRoot}/dist/${projectRoot}`,
            '-G "MinGW Makefiles"',
            '-DCMAKE_C_COMPILER=gcc-13',
            '-DCMAKE_CXX_COMPILER=gcc-13',
            '-DCMAKE_BUILD_TYPE=Debug',
            ...options.args,
        );
        expect(result).toBe(false);
    });
});
