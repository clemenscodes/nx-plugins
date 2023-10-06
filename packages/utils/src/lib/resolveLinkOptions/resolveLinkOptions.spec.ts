import type { Tree } from '@nx/devkit';
import type {
    BinGeneratorSchema,
    LibGeneratorSchema,
    LinkGeneratorSchema,
    LinkSchema,
} from '@/types';
import { resolveLinkOptions } from './resolveLinkOptions';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libGenerator } from '../libGenerator/libGenerator';
import * as devkit from '@nx/devkit';
import { binGenerator } from '../binGenerator/binGenerator';

describe('resolveLinkOptions', () => {
    let tree: Tree;
    let options: LinkGeneratorSchema;
    let libOptions: LibGeneratorSchema;
    let binOptions: BinGeneratorSchema;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            source: 'liblink',
            target: 'libtarget',
            link: 'shared',
        };
        binOptions = {
            name: 'binary',
            language: 'C++',
            generateTests: false,
        };
        libOptions = {
            name: 'link',
            language: 'C++',
            generateTests: true,
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
    });

    it('should throw when source project does not exist', () => {
        expect(() => resolveLinkOptions(tree, options)).toThrow(
            "Cannot find configuration for 'libtarget'",
        );
    });

    it('should resolve link options when source project exists', async () => {
        await libGenerator(tree, libOptions);
        libOptions.name = 'target';
        await libGenerator(tree, libOptions);
        const resolvedOptions = resolveLinkOptions(tree, options);
        const expectedResolvedOptions: LinkSchema = {
            source: 'liblink',
            target: 'libtarget',
            link: 'shared',
            sourceProjectRoot: 'packages/link',
        };
        expect(resolvedOptions).toStrictEqual(expectedResolvedOptions);
    });

    it('should error when target project is not a library', async () => {
        options.source = 'binary';
        options.target = 'binary';
        await binGenerator(tree, binOptions);
        expect(() => resolveLinkOptions(tree, options)).toThrow(
            'Project binary is not a library and not linkable',
        );
    });
});
