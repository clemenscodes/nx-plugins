import type { Tree } from '@nx/devkit';
import type { WorkspaceLayout } from '@/types';
import { readNxJson } from '@nx/devkit';
import { presetGenerator } from './presetGenerator';
import { setupWorkspace } from '@/mocks';

describe('preset generator', () => {
    let tree: Tree;
    let expectedWorkspaceLayout: WorkspaceLayout;

    beforeEach(() => {
        tree = setupWorkspace();
        expectedWorkspaceLayout = {
            appsDir: 'bin',
            libsDir: 'libs',
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should run successfully', async () => {
        await presetGenerator(tree);
        const nxJson = readNxJson(tree);
        if (!nxJson) {
            throw new Error('no nx.json');
        }
        const { workspaceLayout } = nxJson;
        expect(workspaceLayout).toEqual(expectedWorkspaceLayout);
    });
});
