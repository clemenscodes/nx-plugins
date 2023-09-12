import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateBinFiles } from './generateBinFiles';

describe('generateBinFiles', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should generate binary files', () => {
        expect(generateBinFiles).toBeDefined();
    });
});
