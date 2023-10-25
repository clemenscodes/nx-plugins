import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { updateFile } from './updateFileFile';
import { writeFileWithTree } from '../writeFileWithTree/writeFileWithTree';

describe('updateFile', () => {
    let tree: Tree;
    let oldContent: string;
    let file: string;
    let content: string;
    let expected: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        file = 'some_file.txt';
        content = 'some new content\n';
        oldContent = writeFileWithTree(tree, file, content);
        expected = oldContent + '\n' + content;
    });

    it('should update file', () => {
        content = 'some new content';
        const result = updateFile(tree, file, content);
        expected = oldContent + '\n' + content;
        expect(result).toStrictEqual(expected);
    });
});
