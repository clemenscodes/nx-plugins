import { configureProjectWithCMake } from './configureProjectWithCMake';
import { type CmakeExecutorSchema, LINUX_CMAKE } from '@/config';
import * as configModule from '@/config';
import * as getCmakeCommandArgumentsModule from '../getCmakeCommandArguments/getCmakeCommandArguments';
import * as runCommandModule from '../runCommand/runCommand';

describe('buildProjectWithMake', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: CmakeExecutorSchema;
    let runCommandMock: jest.SpyInstance;
    let getCmakeMock: jest.SpyInstance;
    let getCmakeCommandArgumentsMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = 'workspaceRoot';
        projectRoot = 'projectRoot';
        options = {
            args: [],
            release: false,
        };
        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        getCmakeCommandArgumentsMock = jest.spyOn(
            getCmakeCommandArgumentsModule,
            'getCmakeCommandArguments',
        );
        getCmakeMock = jest.spyOn(configModule, 'getCmake');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should configure project with cmake and return true', () => {
        runCommandMock.mockReturnValue({ success: true });
        getCmakeMock.mockReturnValue(LINUX_CMAKE);
        getCmakeCommandArgumentsMock.mockReturnValue([]);
        const result = configureProjectWithCMake(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(runCommandMock).toHaveBeenCalledWith(LINUX_CMAKE);
        expect(result).toBe(true);
    });
});
