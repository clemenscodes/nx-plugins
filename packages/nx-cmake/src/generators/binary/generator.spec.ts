import { type Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import type { BinGeneratorSchema } from './schema';
import binGenerator from './generator';
import * as devkit from '@nx/devkit';

describe('bin generator', () => {
    let tree: Tree;
    let options: BinGeneratorSchema;
    const formatFilesMock = jest
        .spyOn(devkit, 'formatFiles')
        .mockImplementation(jest.fn());

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            generateTests: true,
            language: 'C',
            skipFormat: false,
        };
    });

    it('should generate a binary with tests and formatting', async () => {
        await binGenerator(tree, options);
        const binConfig = readProjectConfiguration(tree, 'test');
        const libConfig = readProjectConfiguration(tree, 'libtest');
        const testConfig = readProjectConfiguration(tree, 'testtest');
        expect(binConfig).toBeDefined();
        expect(libConfig).toBeDefined();
        expect(testConfig).toBeDefined();
        expect(formatFilesMock).toHaveBeenCalledTimes(2);
        formatFilesMock.mockReset();
    });

    it('should generate a binary without tests and without formatting', async () => {
        options.generateTests = false;
        options.skipFormat = true;
        await binGenerator(tree, options);
        const binConfig = readProjectConfiguration(tree, 'test');
        const libConfig = readProjectConfiguration(tree, 'libtest');
        expect(binConfig).toBeDefined();
        expect(libConfig).toBeDefined();
        expect(() => readProjectConfiguration(tree, 'testtest')).toThrow(
            "Cannot find configuration for 'testtest'"
        );
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        formatFilesMock.mockReset();
    });
});
