import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { resolveBinOptions } from './resolveBinOptions';

describe('resolveBinOptions ', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should resolve binary options', () => {
        expect(resolveBinOptions).toBeDefined();
    });
});
