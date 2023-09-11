import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import type { Tree } from '@nx/devkit';
import { moduleGenerator } from './generator';
import { ModuleGeneratorSchema } from './schema';
import { LibGeneratorSchema } from '../library/schema';
import libGenerator from '../library/generator';

describe('module generator', () => {
    let tree: Tree;

    const options: ModuleGeneratorSchema = {
        name: 'libtest',
        language: 'C',
        skipFormat: false,
    };

    const libOptions: LibGeneratorSchema = {
        name: 'test',
        language: 'C++',
        skipFormat: false,
        generateTests: true,
    };

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        await libGenerator(tree, libOptions);
    });

    it('should run successfully', async () => {
        await moduleGenerator(tree, options);
    });
});
