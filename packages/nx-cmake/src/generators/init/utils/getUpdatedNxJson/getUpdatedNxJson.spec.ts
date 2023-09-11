import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { getUpdatedNxJson } from './getUpdatedNxJson';

describe('getUpdatedNxJson', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should get updated nx.json', async () => {
        expect(getUpdatedNxJson).toBeDefined();
    });
});
