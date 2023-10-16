import type { Tree } from '@nx/devkit';
import { updateRootCmakeFile } from './updateRootCmakeFile';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { initGenerator } from '../initGenerator/initGenerator';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import {
    InitGeneratorSchema,
    PROJECT_FILE,
    getDefaultInitGeneratorOptions,
} from '@/config';
import * as devkit from '@nx/devkit';

describe('updateRootCmakeFile', () => {
    let tree: Tree;
    let initOptions: InitGeneratorSchema;
    let oldContent: string;
    let cmakeFile: string;
    let content: string;
    let expected: string;

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        tree = createTreeWithEmptyWorkspace();
        initOptions = getDefaultInitGeneratorOptions();
        await initGenerator(tree, initOptions);
        cmakeFile = PROJECT_FILE;
        oldContent = readFileWithTree(tree, cmakeFile);
    });

    it('should update root cmake file', () => {
        content = 'some new content';
        const result = updateRootCmakeFile(tree, content);
        expected = oldContent + '\n' + content;
        expect(result).toStrictEqual(expected);
    });
});
