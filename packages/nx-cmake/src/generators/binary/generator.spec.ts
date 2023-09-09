import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { binGenerator } from './generator';
import { BinGeneratorSchema } from './schema';

describe('bin generator', () => {
    let tree: Tree;
    const options: BinGeneratorSchema = {
        name: 'test',
        constantName: 'TEST',
        relativeRootPath: '../../',
        generateTests: true,
        language: 'C',
        cmakeC: 'C',
        skipFormat: false,
        languageExtension: '',
    };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        await binGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'test');
        expect(config).toBeDefined();
    });
});
