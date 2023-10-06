import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema } from '@/types';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { writeFileWithTree } from './writeFileWithTree';
import { libGenerator } from '../libGenerator/libGenerator';
import * as devkit from '@nx/devkit';

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
            generateTests: true,
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await libGenerator(tree, libOptions);
        expectedFile = 'packages/link/CMakeLists.txt';
        expectedWrittenContent = 'include("../../CMakeLists.txt")\n';
    });

    it('should write the CMake file correctly', () => {
        const writtenContent = writeFileWithTree(
            tree,
            expectedFile,
            expectedWrittenContent,
        );
        expect(writtenContent).toBe(expectedWrittenContent);
    });
});
