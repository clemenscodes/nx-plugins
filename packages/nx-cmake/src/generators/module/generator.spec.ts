import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { moduleGenerator } from './generator';
import { ModuleGeneratorSchema } from './schema';
import { LibGeneratorSchema } from '../library/schema';
import libGenerator from '../library/generator';

describe('file generator', () => {
    let tree: Tree;
    const name = 'test';

    const options: ModuleGeneratorSchema = {
        name,
        upperName: 'TEST',
        relativeRootPath: '../../',
        languageExtension: 'cpp',
        project: 'libtest',
        resolvedProject: 'LIBTEST',
        include: '',
        language: 'C',
        cmakeC: 'C',
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
        languageExtension: 'cpp',
        generateTests: true,
        testLib: 'gtest',
        setupTests: 'gtest_discover_tests(testgtest)',
        includeGoogleTest: 'include(GoogleTest)',
        baseTest: '',
    };

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        await libGenerator(tree, libOptions);
    });

    it('should run successfully', async () => {
        await moduleGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'libtest');
        const { sourceRoot, root } = config;
        const srcFilePath = `${sourceRoot}/${name}.cpp`;
        const includeFilePath = `${root}/include/${name}.h`;
        const srcFile = tree.read(srcFilePath);
        const includeFile = tree.read(includeFilePath);
        expect(config).toBeDefined();
        expect(srcFile).toBeDefined();
        expect(includeFile).toBeDefined();
    });
});
