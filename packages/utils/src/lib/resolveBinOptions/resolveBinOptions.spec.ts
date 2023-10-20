import type { Tree } from '@nx/devkit';
import type { BinGeneratorSchema, BinSchema } from '@/config';
import { getDefaultInitGeneratorOptions } from '@/config';
import { resolveBinOptions } from './resolveBinOptions';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { initGenerator } from '../initGenerator/initGenerator';
import * as devkit from '@nx/devkit';

describe('resolveBinOptions ', () => {
    let options: BinGeneratorSchema;
    let expected: BinSchema;
    let tree: Tree;

    beforeEach(async () => {
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        tree = createTreeWithEmptyWorkspace();
        await initGenerator(tree, getDefaultInitGeneratorOptions());

        options = {
            name: 'base',
            language: 'C++',
            generateTests: false,
        };

        expected = {
            ...options,
            constantName: 'BASE',
            snakeCaseName: 'base',
            camelCaseName: 'base',
            className: 'Base',
            cmakeConfigDir: '.cmake',
            workspaceName: 'workspace',
            languageExtension: 'cpp',
            relativeRootPath: '../../',
            cmakeC: 'CXX',
            projectRoot: 'bin/base',
            linkOptions: {
                source: 'base',
                target: 'libbase',
            },
        };
    });

    const defaultTest = () => {
        const result = resolveBinOptions(options);
        expect(result).toStrictEqual(expected);
    };

    it('should resolve default binary options', defaultTest);

    it('should resolve binary options when language is C', () => {
        options.language = 'C';
        options.generateTests = true;
        expected.language = 'C';
        expected.generateTests = true;
        expected.languageExtension = 'c';
        expected.cmakeC = 'C';
        expected.projectRoot = 'bin/base';
        defaultTest();
    });
});
