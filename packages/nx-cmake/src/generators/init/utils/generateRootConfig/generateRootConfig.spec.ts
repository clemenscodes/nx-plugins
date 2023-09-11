import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateRootConfig } from './generateRootConfig';

describe('generateRootConfig', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should generate root config', async () => {
        expect(generateRootConfig).toBeDefined();
    });
});
