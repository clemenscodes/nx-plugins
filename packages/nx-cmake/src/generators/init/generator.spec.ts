import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from './schema';
import initGenerator from './generator';
import * as devkit from '@nx/devkit';

describe('init generator', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    const formatFilesMock = jest
        .spyOn(devkit, 'formatFiles')
        .mockImplementation(jest.fn());

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'as-provided',
            cmakeConfigDir: 'cmake',
            addClangPreset: true,
            skipFormat: true,
        };
    });

    it('should run successfully with formatting', async () => {
        await initGenerator(tree, options);
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        formatFilesMock.mockReset();
    });

    it('should run successfully without formatting', async () => {
        options.skipFormat = false;
        await initGenerator(tree, options);
        expect(formatFilesMock).toHaveBeenCalledTimes(1);
        formatFilesMock.mockReset();
    });
});
