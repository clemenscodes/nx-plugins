import type { Tree } from '@nx/devkit';
import { mockFormatFiles } from './mockFormatFiles';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { formatFiles } from '@nx/devkit';

describe('mockFormatFiles', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should mock format files', async () => {
        const formatFilesMock = mockFormatFiles();
        await formatFiles(tree);
        expect(formatFilesMock).toBeCalledTimes(1);
    });
});
