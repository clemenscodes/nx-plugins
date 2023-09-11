import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { libGenerator } from './generator';
import { LibGeneratorSchema } from './schema';
import * as devkit from '@nx/devkit';

describe('lib generator', () => {
    let tree: Tree;

    const options: LibGeneratorSchema = {
        name: 'test',
        language: 'C++',
        skipFormat: false,
        generateTests: true,
    };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        const formatFilesMock = jest
            .spyOn(devkit, 'formatFiles')
            .mockImplementation(jest.fn());
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config).toBeDefined();
        expect(formatFilesMock).toHaveBeenCalledTimes(1);
    });
});
