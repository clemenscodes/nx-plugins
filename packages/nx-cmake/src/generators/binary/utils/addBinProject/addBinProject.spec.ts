import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { addBinProject } from './addBinProject';

describe('addBinProject', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should add a bin project configuration', () => {
        expect(addBinProject).toBeDefined();
    });
});
