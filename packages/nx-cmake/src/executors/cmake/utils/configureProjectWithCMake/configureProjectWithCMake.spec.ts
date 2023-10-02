import type { CmakeExecutorSchema } from '../../schema';
import { configureProjectWithCMake } from './configureProjectWithCMake';
import { LINUX_CMAKE } from '../../../../config/compiler';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';
import * as getCmakeModule from '../getCmake/getCmake';
import * as getCmakeCommandArgumentsModule from '../getCmakeCommandArguments/getCmakeCommandArguments';

describe('buildProjectWithMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: CmakeExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let getCmakeMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let getCmakeCommandArgumentsMock: jest.SpyInstance;

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
        getCmakeCommandArgumentsMock = jest.spyOn(
            getCmakeCommandArgumentsModule,
            'getCmakeCommandArguments',
        );
        getCmakeMock = jest.spyOn(getCmakeModule, 'getCmake');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should configure project with cmake and return true', () => {
        runCommandMock.mockReturnValue({ success: true });
        getCmakeMock.mockReturnValue(LINUX_CMAKE);
        checkCommandExistsMock.mockReturnValue(LINUX_CMAKE);
        getCmakeCommandArgumentsMock.mockReturnValue([]);
        const result = configureProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(checkCommandExistsMock).toHaveBeenCalledWith(LINUX_CMAKE);
        expect(runCommandMock).toHaveBeenCalledWith(LINUX_CMAKE);
        expect(result).toBe(true);
    });
});
