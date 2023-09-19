import { getGccDependenciesCommand } from './getGccDependenciesCommand';
import { WorkspaceLayout } from '../../../../models/types';

describe('getGccDependenciesCommand', () => {
    it('should generate the correct gcc dependency command', () => {
        const fileName = 'testfile.c';
        const projectRoot = 'projectA';
        const workspaceLayout: WorkspaceLayout = { libsDir: 'libs' };
        const result = getGccDependenciesCommand(
            fileName,
            projectRoot,
            workspaceLayout
        );
        const expectedCmd = `gcc -MM ${fileName} -I projectA/include -I libs -I include -I dist/libs/gtest/googletest-src/googletest/include -I dist/libs/cmocka/cmocka-src/include`;
        expect(result).toBe(expectedCmd);
    });
});
