import { generateGlobalIncludeDir } from './generateGlobalIncludeDir';
import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

describe('generateGlobalIncludeDir', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should generate global include dir', async () => {
        expect(generateGlobalIncludeDir).toBeDefined();
    });
});
