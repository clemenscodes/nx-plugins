import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema } from '../../../generators/library/schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import libGenerator from '../../../generators/library/generator';
import { writeFileWithTree } from './writeFileWithTree';

describe('writeFileWithTree', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let expectedFile: string;
    let expectedWrittenContent: string;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        libOptions = {
            name: 'link',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };
        await libGenerator(tree, libOptions);
        expectedFile = 'packages/link/CMakeLists.txt';
        expectedWrittenContent = 'include("../../CMakeLists.txt")\n';
    });

    it('should write the CMake file correctly', () => {
        const writtenContent = writeFileWithTree(
            tree,
            expectedFile,
            expectedWrittenContent
        );
        expect(writtenContent).toBe(expectedWrittenContent);
    });
});
