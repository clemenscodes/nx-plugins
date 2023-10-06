import { CmakeExecutorSchema } from './../../schema.d';
import { getCmakeCommandArguments } from './getCmakeCommandArguments';
import { LINUX_GCC } from '@/config';
import * as isWindowsModule from '../../../../utils/pluginUtils/isWindows/isWindows';
import * as getCompilerModule from '../../../../utils/pluginUtils/getCompiler/getCompiler';

describe('getCmakeCommandArguments', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: CmakeExecutorSchema;
    let isWindowsMock: jest.SpyInstance;
    let getCompilerMock: jest.SpyInstance;

    beforeEach(() => {
        workspaceRoot = 'workspaceRoot';
        projectRoot = 'projectRoot';
        options = {
            args: [],
            release: false,
        };
        isWindowsMock = jest.spyOn(isWindowsModule, 'isWindows');
        getCompilerMock = jest.spyOn(getCompilerModule, 'getCompiler');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get cmake command arguments', () => {
        isWindowsMock.mockReturnValueOnce(false);
        getCompilerMock.mockReturnValueOnce(LINUX_GCC);
        const cmakeArguments = getCmakeCommandArguments(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(cmakeArguments).toBeDefined();
    });
});
