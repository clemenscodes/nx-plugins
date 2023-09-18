import type { Tree } from '@nx/devkit';
import type { LibGeneratorSchema } from './schema';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readProjectConfiguration } from '@nx/devkit';
import libGenerator from './generator';
import * as devkit from '@nx/devkit';

describe('lib generator', () => {
    let tree: Tree;
    let options: LibGeneratorSchema;
    let formatFilesMock: jest.SpyInstance;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };
        formatFilesMock = jest
            .spyOn(devkit, 'formatFiles')
            .mockImplementation(jest.fn());
    });

    it('should run successfully with formatting', async () => {
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config.tags).toStrictEqual(['cpp']);
        expect(formatFilesMock).toHaveBeenCalledTimes(1);
        formatFilesMock.mockReset();
    });

    it('should run successfully without formatting', async () => {
        options.skipFormat = true;
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config.tags).toStrictEqual(['cpp']);
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        formatFilesMock.mockReset();
    });

    it('should generate lib and no tests', async () => {
        options.generateTests = false;
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config.tags).toStrictEqual(['cpp']);
        expect(() => readProjectConfiguration(tree, 'testtest')).toThrow(
            "Cannot find configuration for 'testtest'"
        );
    });

    it('should generate lib and tests', async () => {
        options.language = 'C';
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        const testConfig = readProjectConfiguration(tree, 'testtest');
        expect(config.tags).toStrictEqual(['c']);
        expect(testConfig.tags).toStrictEqual(['c', 'test']);
    });
});
