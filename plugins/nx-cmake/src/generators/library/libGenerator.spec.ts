import type { Tree } from '@nx/devkit';
import { readProjectConfiguration } from '@nx/devkit';
import { libGenerator } from './libGenerator';
import initGenerator from '../init/initGenerator';
import { LibGeneratorSchema } from '../generator';
import { getDefaultInitGeneratorOptions } from '../init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import { setupWorkspace } from '@/mocks';

describe('lib generator', () => {
    let tree: Tree;
    let options: LibGeneratorSchema;

    beforeEach(async () => {
        tree = setupWorkspace();
        options = {
            name: 'test',
            language: 'C++',
            generateTests: true,
        };
        await initGenerator(tree, getDefaultInitGeneratorOptions());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should run successfully with formatting', async () => {
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config.tags).toStrictEqual(['cpp']);
    });

    it('should run successfully without formatting', async () => {
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config.tags).toStrictEqual(['cpp']);
    });

    it('should generate lib and no tests', async () => {
        options.generateTests = false;
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config.tags).toStrictEqual(['cpp']);
        expect(() => readProjectConfiguration(tree, 'testtest')).toThrow(
            "Cannot find configuration for 'testtest'",
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
