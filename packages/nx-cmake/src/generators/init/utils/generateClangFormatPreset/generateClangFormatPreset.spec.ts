import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateClangFormatPreset } from './generateClangFormatPreset';

describe('generateClangFormatPreset', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should generate clang format preset', async () => {
        expect(generateClangFormatPreset).toBeDefined();
    });
});
