import type { Tree } from '@nx/devkit';
import { resolveOptions } from './resolveOptions';
import initGenerator from '../../generators/init/initGenerator';
import { GeneratorBaseOptions } from '../../generators/generator';
import { getDefaultInitGeneratorOptions } from '../../generators/init/getDefaultInitGeneratorOptions/getDefaultInitGeneratorOptions';
import { setupWorkspace } from '@/mocks';

describe('resolveOptions', () => {
    let tree: Tree;
    let options: GeneratorBaseOptions;
    let expected: Required<GeneratorBaseOptions>;

    beforeEach(async () => {
        tree = setupWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());
        options = {
            name: 'exampleName',
            language: 'C++',
        };
        expected = {
            ...options,
            relativeRootPath: '../../',
            constantName: 'EXAMPLE_NAME',
            snakeCaseName: 'example_name',
            camelCaseName: 'exampleName',
            cmakeConfigDir: '.cmake',
            workspaceName: 'workspace',
            appsDir: 'bin',
            libsDir: 'packages',
            className: 'ExampleName',
            languageExtension: 'cpp',
            cmakeC: 'CXX',
        };
    });

    it('should resolve options correctly', () => {
        const result = resolveOptions(options);
        expect(result).toEqual(expected);
    });

    it('should resolve options correctly', () => {
        options.language = 'C';
        expected.language = 'C';
        expected.languageExtension = 'c';
        expected.cmakeC = 'C';
        const result = resolveOptions(options);
        expect(result).toEqual(expected);
    });
});
