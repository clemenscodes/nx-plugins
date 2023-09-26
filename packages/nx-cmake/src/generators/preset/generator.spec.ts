import type { Tree } from '@nx/devkit';
import type { WorkspaceLayout } from '../../models/types';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readNxJson } from '@nx/devkit';
import presetGenerator from './generator';
import * as devkit from '@nx/devkit';

describe('preset generator', () => {
    let tree: Tree;
    let expectedWorkspaceLayout: WorkspaceLayout;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        expectedWorkspaceLayout = {
            appsDir: 'bin',
            libsDir: 'libs',
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
    });

    it('should run successfully', async () => {
        await presetGenerator(tree);
        const { workspaceLayout } = readNxJson(tree);
        expect(workspaceLayout).toEqual(expectedWorkspaceLayout);
    });
});
