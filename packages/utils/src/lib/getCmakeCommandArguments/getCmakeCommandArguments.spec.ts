import { getCmakeCommandArguments } from './getCmakeCommandArguments';
import {
    CmakeExecutorSchema,
    LINUX_GCC,
    WINDOWS_GCC,
    WINDOWS_MAKE,
} from '@/config';
import * as configModule from '@/config';
import { join } from 'path';

describe('getCmakeCommandArguments', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: CmakeExecutorSchema;
    let isWindowsMock: jest.SpyInstance;
    let getMakeMock: jest.SpyInstance;
    let getGccMock: jest.SpyInstance;
    let getGccReturnMock: string;

    beforeEach(() => {
        workspaceRoot = 'workspaceRoot';
        projectRoot = 'projectRoot';
        getGccReturnMock = LINUX_GCC[0];
        options = {
            args: [],
            release: false,
        };
        isWindowsMock = jest
            .spyOn(configModule, 'isWindows')
            .mockReturnValue(false);
        getGccMock = jest
            .spyOn(configModule, 'getGcc')
            .mockReturnValue(getGccReturnMock);
        getMakeMock = jest.spyOn(configModule, 'getMake');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should get cmake command arguments on windows', () => {
        isWindowsMock.mockReturnValue(true);
        getMakeMock.mockReturnValue(WINDOWS_MAKE[0]);
        getGccMock.mockReturnValue(WINDOWS_GCC[0]);
        const cmakeArguments = getCmakeCommandArguments(
            workspaceRoot,
            projectRoot,
            options,
        );
        const expectedCmakeArguments = [
            '-S',
            join('workspaceRoot/projectRoot'),
            join('workspaceRoot/dist/projectRoot'),
            '-G "MinGW Makefiles"',
            '-DCMAKE_MAKE_PROGRAM=C:/msys64/ucrt64/bin/mingw32-make.exe',
            '-DCMAKE_C_COMPILER=C:/msys64/ucrt64/bin/gcc.exe',
            '-DCMAKE_CXX_COMPILER=C:/msys64/ucrt64/bin/gcc.exe',
            '-DCMAKE_BUILD_TYPE=Debug',
        ];
        expect(cmakeArguments).toStrictEqual(expectedCmakeArguments);
    });
});
