import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { libGenerator } from './generator';
import { LibGeneratorSchema } from './schema';
import * as devkit from '@nx/devkit';

describe('lib generator', () => {
    let tree: Tree;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully with formatting', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };

        const formatFilesMock = jest
            .spyOn(devkit, 'formatFiles')
            .mockImplementation(jest.fn());
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config).toBeDefined();
        expect(formatFilesMock).toHaveBeenCalledTimes(1);
        formatFilesMock.mockReset();
    });

    it('should run successfully without formatting', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: true,
            generateTests: true,
        };
        const formatFilesMock = jest
            .spyOn(devkit, 'formatFiles')
            .mockImplementation(jest.fn());
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config).toBeDefined();
        expect(formatFilesMock).toHaveBeenCalledTimes(0);
        formatFilesMock.mockReset();
    });

    it('should generate lib and no tests', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: true,
            generateTests: false,
        };
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config).toBeDefined();
        expect(() => readProjectConfiguration(tree, 'testtest')).toThrow(
            "Cannot find configuration for 'testtest'"
        );
    });

    it('should generate lib and tests', async () => {
        const options: LibGeneratorSchema = {
            name: 'test',
            language: 'C++',
            skipFormat: true,
            generateTests: true,
        };
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        const testConfig = readProjectConfiguration(tree, 'testtest');
        expect(config).toBeDefined();
        expect(testConfig).toBeDefined();
    });
});
