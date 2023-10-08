import { CmakeExecutorSchema } from './../../schema.d';
import { getCmakeCommandArguments } from './getCmakeCommandArguments';
import { LINUX_GCC } from '@/config';
import * as utilsModule from '@/utils';

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
        isWindowsMock = jest.spyOn(utilsModule, 'isWindows');
        jest.spyOn(utilsModule, 'getGcc').mockReturnValue(getGccReturnMock);
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
