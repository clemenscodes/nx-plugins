import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readNxJson } from '@nx/devkit';
import { initGenerator } from './generator';
import { InitGeneratorSchema } from './schema';

describe('init generator', () => {
    let tree: Tree;

    const options: InitGeneratorSchema = {
        appsDir: 'bin',
        libsDir: 'packages',
        projectNameAndRootFormat: 'as-provided',
        cmakeConfigDir: 'cmake',
        addClangFormatPreset: true,
        skipFormat: false,
    };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        await initGenerator(tree, options);
        const config = readNxJson(tree);
        expect(config).toBeDefined();
    });
});
