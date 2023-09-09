import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { libGenerator } from './generator';
import { LibGeneratorSchema } from './schema';

describe('lib generator', () => {
    let tree: Tree;

    const options: LibGeneratorSchema = {
        name: 'test',
        constantName: 'TEST',
        language: 'C++',
        relativeRootPath: '../../',
        cmakeC: 'CXX',
        link: 'shared',
        skipFormat: false,
        generateTests: true,
        languageExtension: 'cpp',
        testLib: 'gtest',
        setupTests: 'gtest_discover_tests(testgtest)',
        includeGoogleTest: 'include(GoogleTest)',
        baseTest: '',
    };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        await libGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config).toBeDefined();
    });
});
