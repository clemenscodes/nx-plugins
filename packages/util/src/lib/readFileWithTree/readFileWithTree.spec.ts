import type { Tree } from '@nx/devkit';
import { readFileWithTree } from './readFileWithTree';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { writeFileWithTree } from '../writeFileWithTree/writeFileWithTree';

describe('writeFileWithTree', () => {
    let tree: Tree;
    let expectedFile: string;
    let expectedFileContent: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        expectedFile = 'some_file.txt';
        expectedFileContent = 'some content\n';
        writeFileWithTree(tree, expectedFile, expectedFileContent);
    });

    it('should read the file correctly', () => {
        const readContent = readFileWithTree(tree, expectedFile);
        expect(readContent).toBe(expectedFileContent);
    });
});
