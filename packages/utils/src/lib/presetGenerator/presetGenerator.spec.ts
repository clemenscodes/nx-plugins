import type { Tree } from '@nx/devkit';
import type { WorkspaceLayout } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readNxJson } from '@nx/devkit';
import { presetGenerator } from './presetGenerator';

describe('preset generator', () => {
    let tree: Tree;
    let expectedWorkspaceLayout: WorkspaceLayout;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
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
