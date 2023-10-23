import type { Tree } from '@nx/devkit';
import { output } from '@nx/devkit';
import initGenerator from './initGenerator';
import * as checkNxVersionModule from '../../config/checkNxVersion/checkNxVersion';
import { InitGeneratorSchema } from '../generator';
import { getDefaultInitGeneratorOptions } from './getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import { setupWorkspace } from '@/mocks';

describe('init generator', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let checkNxVersionMock: jest.SpyInstance;
    let nxOutputWarnMock: jest.SpyInstance;
    let nxOutputErrorMock: jest.SpyInstance;

    beforeEach(() => {
        tree = setupWorkspace();
        options = getDefaultInitGeneratorOptions();
        checkNxVersionMock = jest.spyOn(checkNxVersionModule, 'checkNxVersion');
        nxOutputWarnMock = jest.spyOn(output, 'warn');
        nxOutputErrorMock = jest.spyOn(output, 'error');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should run successfully with formatting', async () => {
        await initGenerator(tree, options);
        expect(checkNxVersionMock).toHaveBeenCalledTimes(1);
        expect(nxOutputWarnMock).toHaveBeenCalledTimes(0);
        expect(nxOutputErrorMock).toHaveBeenCalledTimes(0);
    });

    it('should run successfully without formatting', async () => {
        await initGenerator(tree, options);
        expect(checkNxVersionMock).toHaveBeenCalledTimes(1);
        expect(nxOutputWarnMock).toHaveBeenCalledTimes(0);
        expect(nxOutputErrorMock).toHaveBeenCalledTimes(0);
    });

    it('should warn when nx version unsupported', async () => {
        checkNxVersionMock.mockReturnValueOnce(false);
        nxOutputWarnMock.mockImplementationOnce(jest.fn());
        await initGenerator(tree, options);
        expect(checkNxVersionMock).toHaveBeenCalledTimes(1);
        expect(nxOutputWarnMock).toHaveBeenCalledTimes(1);
        expect(nxOutputErrorMock).toHaveBeenCalledTimes(0);
    });
});
