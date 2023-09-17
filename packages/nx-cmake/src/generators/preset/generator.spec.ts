import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { type Tree, readNxJson } from '@nx/devkit';
import type { WorkspaceLayout } from '../../models/types';
import { presetGenerator } from './generator';

describe('preset generator', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        await presetGenerator(tree);
        const { workspaceLayout } = readNxJson(tree);
        const expectedWorkspaceLayout: WorkspaceLayout = {
            appsDir: 'bin',
            libsDir: 'libs',
            projectNameAndRootFormat: 'derived',
        };
        expect(workspaceLayout).toEqual(expectedWorkspaceLayout);
    });
});
