import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { initGenerator } from './generator';
import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from './schema';
import * as devkit from '@nx/devkit';

describe('init generator', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully with formatting', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'as-provided',
            cmakeConfigDir: 'cmake',
            addClangFormatPreset: true,
            skipFormat: true,
        };

        await initGenerator(tree, options);
        const formatFilesMock = jest
            .spyOn(devkit, 'formatFiles')
            .mockImplementation(jest.fn());
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        formatFilesMock.mockReset();
    });

    it('should run successfully without formatting', async () => {
        const options: InitGeneratorSchema = {
            appsDir: 'bin',
            libsDir: 'packages',
            projectNameAndRootFormat: 'as-provided',
            cmakeConfigDir: 'cmake',
            addClangFormatPreset: true,
            skipFormat: false,
        };

        await initGenerator(tree, options);
        const formatFilesMock = jest
            .spyOn(devkit, 'formatFiles')
            .mockImplementation(jest.fn());
        expect(formatFilesMock).toHaveBeenCalledTimes(1);
        formatFilesMock.mockReset();
    });
});
