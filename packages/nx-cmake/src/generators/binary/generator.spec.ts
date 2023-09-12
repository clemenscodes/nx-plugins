import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { binGenerator } from './generator';
import { BinGeneratorSchema } from './schema';

describe('bin generator', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        const options: BinGeneratorSchema = {
            name: 'test',
            generateTests: true,
            language: 'C',
            skipFormat: false,
        };
        await binGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'testtest');
        expect(config).toBeDefined();
    });
});
