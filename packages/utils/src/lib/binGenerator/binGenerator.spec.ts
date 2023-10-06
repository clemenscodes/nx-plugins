import type { Tree } from '@nx/devkit';
import type { BinGeneratorSchema } from '@/types';
import { readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { binGenerator } from './binGenerator';
import * as devkit from '@nx/devkit';

describe('bin generator', () => {
    let tree: Tree;
    let options: BinGeneratorSchema;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            generateTests: true,
            language: 'C',
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should generate a binary with tests and formatting', async () => {
        await binGenerator(tree, options);
        const binConfig = readProjectConfiguration(tree, 'test');
        const libConfig = readProjectConfiguration(tree, 'libtest');
        const testConfig = readProjectConfiguration(tree, 'testtest');
        expect(binConfig).toBeDefined();
        expect(libConfig).toBeDefined();
        expect(testConfig).toBeDefined();
    });

    it('should generate a binary without tests and without formatting', async () => {
        options.generateTests = false;
        await binGenerator(tree, options);
        const binConfig = readProjectConfiguration(tree, 'test');
        const libConfig = readProjectConfiguration(tree, 'libtest');
        expect(binConfig).toBeDefined();
        expect(libConfig).toBeDefined();
        expect(() => readProjectConfiguration(tree, 'testtest')).toThrow(
            "Cannot find configuration for 'testtest'",
        );
    });
});
