import type { CTag } from '@/config';
import { LINUX_GCC } from '@/config';
import { getGccDependenciesCommand } from './getGccDependenciesCommand';
import * as isWindowsModule from '@/utils/lib/isWindows/isWindows';
import * as isDarwinModule from '@/utils/lib/isDarwin/isDarwin';
import * as getGccModule from '@/utils/lib/getGcc/getGcc';

describe('getGccDependenciesCommand', () => {
    let fileName: string;
    let projectRoot: string;
    let tag: CTag;
    let libsDir: string;
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;

    beforeEach(() => {
        fileName = 'testfile.c';
        projectRoot = 'projectA';
        tag = 'c';
        libsDir = 'libs';
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(isDarwinModule, 'isDarwin')
            .mockReturnValue(false);
        jest.spyOn(getGccModule, 'getGcc').mockReturnValue(LINUX_GCC[0]);
    });

    afterEach(() => {
        jest.restoreAllMocks;
    });

    it('linux should generate the correct gcc c dependency command', () => {
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            libsDir,
            tag,
        );
        const expectedCmd = `${LINUX_GCC[0]} -x c -MM ${fileName} -I projectA -I projectA/include -I projectA/src -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });

    it('darwin should generate the correct gcc c++ dependency command', () => {
        isDarwinMock.mockReturnValue(true);
        tag = 'cpp';
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            libsDir,
            tag,
        );
        const expectedCmd = `${LINUX_GCC[0]} -x c++ -MM ${fileName} -I projectA -I projectA/include -I projectA/src -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });

    it('windows should generate the correct gcc c++ dependency command', () => {
        isWindowsMock.mockReturnValue(true);
        tag = 'cpp';
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            libsDir,
            tag,
        );
        const expectedCmd = `${LINUX_GCC[0]} -x c++ -MM ${fileName} -I projectA -I projectA/include -I projectA/src -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });
});