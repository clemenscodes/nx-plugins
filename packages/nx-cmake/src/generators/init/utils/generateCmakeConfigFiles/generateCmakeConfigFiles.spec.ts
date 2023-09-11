import { generateCmakeConfigFiles } from './generateCmakeConfigFiles';
import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

describe('generateCmakeConfigFiles', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should generate cmake config files', async () => {
        expect(generateCmakeConfigFiles).toBeDefined();
    });
});
