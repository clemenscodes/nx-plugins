import type { CTag, WorkspaceLayout } from '../../../../models/types';
import { getGccDependenciesCommand } from './getGccDependenciesCommand';
import { GCC, DARWIN_GCC } from '../../../../config/programs';
import * as isWindowsModule from '../../../pluginUtils/isWindows/isWindows';
import * as isDarwinModule from '../../../pluginUtils/isDarwin/isDarwin';

describe('getGccDependenciesCommand', () => {
    let fileName: string;
    let projectRoot: string;
    let tag: CTag;
    let workspaceLayout: WorkspaceLayout;
    let isWindowsMock: jest.SpyInstance;
    let isDarwinMock: jest.SpyInstance;

    beforeEach(() => {
        fileName = 'testfile.c';
        projectRoot = 'projectA';
        tag = 'c';
        workspaceLayout = { libsDir: 'libs' };
        isWindowsMock = jest
            .spyOn(isWindowsModule, 'isWindows')
            .mockReturnValue(false);
        isDarwinMock = jest
            .spyOn(isDarwinModule, 'isDarwin')
            .mockReturnValue(false);
    });

    afterEach(() => {
        jest.restoreAllMocks;
    });

    it('linux should generate the correct gcc c dependency command', () => {
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout,
            tag,
        );
        const expectedCmd = `${GCC} -x c -MM ${fileName} -I projectA -I projectA/include -I projectA/src -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });

    it('darwin should generate the correct gcc c++ dependency command', () => {
        isDarwinMock.mockReturnValue(true);
        tag = 'cpp';
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout,
            tag,
        );
        const expectedCmd = `${DARWIN_GCC} -x c++ -MM ${fileName} -I projectA -I projectA/include -I projectA/src -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });

    it('windows should generate the correct gcc c++ dependency command', () => {
        isWindowsMock.mockReturnValue(true);
        tag = 'cpp';
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout,
            tag,
        );
        const expectedCmd = `${GCC} -x c++ -MM ${fileName} -I projectA -I projectA/include -I projectA/src -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });
});
