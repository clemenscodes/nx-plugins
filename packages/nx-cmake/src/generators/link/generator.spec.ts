import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { linkGenerator } from './generator';
import { LinkGeneratorSchema } from './schema';
import { LibGeneratorSchema } from '../library/schema';
import libGenerator from '../library/generator';

describe('link generator', () => {
    let tree: Tree;

    const options: LinkGeneratorSchema = {
        library: 'liblink',
        project: 'libtest',
        link: 'shared',
        skipFormat: false,
    };

    const libOptions: LibGeneratorSchema = {
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

    const linkLibOptions: LibGeneratorSchema = {
        name: 'link',
        constantName: 'LINK',
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

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        await libGenerator(tree, linkLibOptions);
        await libGenerator(tree, libOptions);
    });

    it('should run successfully', async () => {
        await linkGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        expect(config).toBeDefined();
    });
});
