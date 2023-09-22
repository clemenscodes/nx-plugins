import type { CTag, WorkspaceLayout } from '../../../../models/types';
import { getGccDependenciesCommand } from './getGccDependenciesCommand';

describe('getGccDependenciesCommand', () => {
    let fileName: string;
    let projectRoot: string;
    let tag: CTag;
    let workspaceLayout: WorkspaceLayout;

    beforeEach(() => {
        fileName = 'testfile.c';
        projectRoot = 'projectA';
        tag = 'c';
        workspaceLayout = { libsDir: 'libs' };
    });

    it('should generate the correct gcc c dependency command', () => {
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout,
            tag
        );
        const expectedCmd = `gcc -x c -MM ${fileName} -I projectA/include -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });

    it('should generate the correct gcc c++ dependency command', () => {
        tag = 'cpp';
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout,
            tag
        );
        const expectedCmd = `gcc -x c++ -MM ${fileName} -I projectA/include -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });
});
