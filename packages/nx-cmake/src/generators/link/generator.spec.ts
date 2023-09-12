import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { linkGenerator } from './generator';
import { LinkGeneratorSchema } from './schema';
import { LibGeneratorSchema } from '../library/schema';
import libGenerator from '../library/generator';

describe('link generator', () => {
    let tree: Tree;

    const options: LinkGeneratorSchema = {
        source: 'liblink',
        target: 'libtest',
        link: 'shared',
        skipFormat: false,
    };

    const libOptions: LibGeneratorSchema = {
        name: 'test',
        language: 'C++',
        skipFormat: false,
        generateTests: true,
    };

    const linkLibOptions: LibGeneratorSchema = {
        name: 'link',
        language: 'C++',
        skipFormat: false,
        generateTests: true,
    };

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        await libGenerator(tree, linkLibOptions);
        await libGenerator(tree, libOptions);
    });

    it('should run successfully', async () => {
        await linkGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config).toBeDefined();
    });
});
