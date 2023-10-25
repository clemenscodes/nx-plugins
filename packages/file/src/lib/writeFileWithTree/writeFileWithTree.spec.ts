import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { writeFileWithTree } from './writeFileWithTree';

describe('writeFileWithTree', () => {
    let tree: Tree;
    let expectedFile: string;
    let expectedWrittenContent: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        expectedFile = 'test.txt';
        expectedWrittenContent = 'some content\n';
    });

    it('should write the file correctly', () => {
        const writtenContent = writeFileWithTree(
            tree,
            expectedFile,
            expectedWrittenContent,
        );
        expect(writtenContent).toBe(expectedWrittenContent);
    });
});
