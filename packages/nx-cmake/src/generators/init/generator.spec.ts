import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from './schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import initGenerator from './generator';
import * as devkit from '@nx/devkit';
import * as checkNxVersionModule from './utils/checkNxVersion/checkNxVersion';
import { output } from '@nx/devkit';

describe('init generator', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let formatFilesMock: jest.SpyInstance;
    let checkNxVersionMock: jest.SpyInstance;
    let nxOutputMock: jest.SpyInstance;

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
        formatFilesMock = jest
            .spyOn(devkit, 'formatFiles')
            .mockImplementation(jest.fn());
        checkNxVersionMock = jest
            .spyOn(checkNxVersionModule, 'checkNxVersion')
            .mockImplementation(jest.fn());

        nxOutputMock = jest.spyOn(output, 'warn').mockImplementation(jest.fn());
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should run successfully with formatting', async () => {
        await initGenerator(tree, options);
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
    });

    it('should run successfully without formatting', async () => {
        options.skipFormat = false;
        await initGenerator(tree, options);
        expect(formatFilesMock).toHaveBeenCalledTimes(1);
    });

    it('should warn when nx version unsupported', async () => {
        checkNxVersionMock.mockReturnValueOnce(false);
        await initGenerator(tree, options);
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        expect(nxOutputMock).toHaveBeenCalledTimes(1);
    });
});
