import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from './schema';
import { output } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import initGenerator from './generator';
import * as devkit from '@nx/devkit';
import * as checkNxVersionModule from './utils/checkNxVersion/checkNxVersion';
import * as checkOsModule from './utils/checkOs/checkOs';

describe('init generator', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let formatFilesMock: jest.SpyInstance;
    let checkNxVersionMock: jest.SpyInstance;
    let nxOutputWarnMock: jest.SpyInstance;
    let nxOutputErrorMock: jest.SpyInstance;
    let checkOsMock: jest.SpyInstance;

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
        formatFilesMock = jest.spyOn(devkit, 'formatFiles');
        checkNxVersionMock = jest.spyOn(checkNxVersionModule, 'checkNxVersion');
        checkOsMock = jest.spyOn(checkOsModule, 'checkOs');
        nxOutputWarnMock = jest.spyOn(output, 'warn');
        nxOutputErrorMock = jest.spyOn(output, 'error');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should run successfully with formatting', async () => {
        await initGenerator(tree, options);
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        expect(checkNxVersionMock).toHaveBeenCalledTimes(1);
        expect(checkOsMock).toHaveBeenCalledTimes(1);
        expect(nxOutputWarnMock).toHaveBeenCalledTimes(0);
        expect(nxOutputErrorMock).toHaveBeenCalledTimes(0);
    });

    it('should run successfully without formatting', async () => {
        options.skipFormat = false;
        await initGenerator(tree, options);
        expect(formatFilesMock).toHaveBeenCalledTimes(1);
        expect(checkNxVersionMock).toHaveBeenCalledTimes(1);
        expect(checkOsMock).toHaveBeenCalledTimes(1);
        expect(nxOutputWarnMock).toHaveBeenCalledTimes(0);
        expect(nxOutputErrorMock).toHaveBeenCalledTimes(0);
    });

    it('should warn when nx version unsupported', async () => {
        checkNxVersionMock.mockReturnValueOnce(false);
        nxOutputWarnMock.mockImplementationOnce(jest.fn());
        await initGenerator(tree, options);
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        expect(checkNxVersionMock).toHaveBeenCalledTimes(1);
        expect(checkOsMock).toHaveBeenCalledTimes(1);
        expect(nxOutputWarnMock).toHaveBeenCalledTimes(1);
        expect(nxOutputErrorMock).toHaveBeenCalledTimes(0);
    });

    it('should error when windows', async () => {
        checkOsMock.mockReturnValueOnce(false);
        nxOutputErrorMock.mockImplementation(jest.fn());
        await expect(
            async () => await initGenerator(tree, options)
        ).rejects.toThrowError('Windows is not supported');
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        expect(checkNxVersionMock).toHaveBeenCalledTimes(0);
        expect(checkOsMock).toHaveBeenCalledTimes(1);
        expect(nxOutputWarnMock).toHaveBeenCalledTimes(0);
        expect(nxOutputErrorMock).toHaveBeenCalledTimes(1);
    });
});
