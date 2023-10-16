import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { initGenerator } from '../initGenerator/initGenerator';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import { updateFile } from './updateFileFile';
import {
    InitGeneratorSchema,
    PROJECT_FILE,
    getDefaultInitGeneratorOptions,
} from '@/config';
import * as devkit from '@nx/devkit';

describe('updateFile', () => {
    let tree: Tree;
    let initOptions: InitGeneratorSchema;
    let oldContent: string;
    let file: string;
    let content: string;
    let expected: string;

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        tree = createTreeWithEmptyWorkspace();
        file = PROJECT_FILE;
        initOptions = getDefaultInitGeneratorOptions();
        await initGenerator(tree, initOptions);
        oldContent = readFileWithTree(tree, file);
    });

    it('should update file', () => {
        content = 'some new content';
        const result = updateFile(tree, file, content);
        expected = oldContent + '\n' + content;
        expect(result).toStrictEqual(expected);
    });
});
