import { linkLibrary } from './linkLibrary';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import type { Tree } from '@nx/devkit';
import type { LinkSchema } from '../../schema';
import type { LibGeneratorSchema } from '../../../library/schema';
import libGenerator from '../../../library/generator';

describe('linkLibrary', () => {
    let tree: Tree;
    let libOptions: LibGeneratorSchema;
    let linkOptions: LinkSchema;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        libOptions = {
            name: 'link',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };
        await libGenerator(tree, libOptions);
        libOptions.name = 'target';
        await libGenerator(tree, libOptions);
        linkOptions = {
            source: 'liblink',
            target: 'libtarget',
            link: 'shared',
            skipFormat: false,
            sourceProjectRoot: 'packages/link',
        };
    });

    it('should link library', () => {
        linkLibrary(tree, linkOptions);
    });
});
