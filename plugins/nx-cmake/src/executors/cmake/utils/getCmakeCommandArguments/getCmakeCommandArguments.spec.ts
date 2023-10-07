import { CmakeExecutorSchema } from './../../schema.d';
import { getCmakeCommandArguments } from './getCmakeCommandArguments';
import { LINUX_GCC } from '@/config';
import * as isWindowsModule from '@/utils/lib/isWindows/isWindows';
import * as getGccModule from '@/utils/lib/getGcc/getGcc';

describe('getCmakeCommandArguments', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: CmakeExecutorSchema;
    let isWindowsMock: jest.SpyInstance;
    let getGccReturnMock: string;

    beforeEach(() => {
        workspaceRoot = 'workspaceRoot';
        projectRoot = 'projectRoot';
        getGccReturnMock = LINUX_GCC[0];
        options = {
            args: [],
            release: false,
        };
        isWindowsMock = jest.spyOn(isWindowsModule, 'isWindows');
        jest.spyOn(getGccModule, 'getGcc').mockReturnValue(getGccReturnMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get cmake command arguments', () => {
        isWindowsMock.mockReturnValueOnce(false);
        const cmakeArguments = getCmakeCommandArguments(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(cmakeArguments).toBeDefined();
    });
});
