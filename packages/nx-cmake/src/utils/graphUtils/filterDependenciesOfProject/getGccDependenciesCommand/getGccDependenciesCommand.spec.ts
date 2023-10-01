import type { CTag, WorkspaceLayout } from '../../../../models/types';
import * as getCompilerModule from '../../../pluginUtils/getCompiler/getCompiler';
import { getGccDependenciesCommand } from './getGccDependenciesCommand';

describe('getGccDependenciesCommand', () => {
    let fileName: string;
    let projectRoot: string;
    let tag: CTag;
    let workspaceLayout: WorkspaceLayout;
    let getCompilerMock: jest.SpyInstance;

    beforeEach(() => {
        fileName = 'testfile.c';
        projectRoot = 'projectA';
        tag = 'c';
        workspaceLayout = { libsDir: 'libs' };
        getCompilerMock = jest
            .spyOn(getCompilerModule, 'getCompiler')
            .mockReturnValue('gcc');
    });

    it('should generate the correct gcc c dependency command', () => {
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout,
            tag,
        );
        const expectedCmd = `gcc -x c -MM ${fileName} -I projectA -I projectA/include -I projectA/src -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });

    it('should generate the correct gcc c++ dependency command', () => {
        getCompilerMock.mockReturnValueOnce('gcc-13');
        tag = 'cpp';
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout,
            tag,
        );
        const expectedCmd = `gcc-13 -x c++ -MM ${fileName} -I projectA -I projectA/include -I projectA/src -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });
});
