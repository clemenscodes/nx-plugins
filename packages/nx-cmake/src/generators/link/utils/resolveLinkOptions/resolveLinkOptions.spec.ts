import type { Tree } from '@nx/devkit';
import type { LinkGeneratorSchema, LinkSchema } from '../../schema';
import type { LibGeneratorSchema } from '../../../library/schema';
import { resolveLinkOptions } from './resolveLinkOptions';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import libGenerator from '../../../library/generator';

describe('resolveLinkOptions', () => {
    let tree: Tree;
    let options: LinkGeneratorSchema;
    let libOptions: LibGeneratorSchema;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            source: 'liblink',
            target: 'libtarget',
            link: 'shared',
            skipFormat: false,
        };
        libOptions = {
            name: 'link',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };
    });

    it('should throw when source project does not exist', () => {
        expect(() => resolveLinkOptions(tree, options)).toThrow(
            "Cannot find configuration for 'liblink'"
        );
    });

    it('should resolve link options when source project exists', async () => {
        await libGenerator(tree, libOptions);
        const resolvedOptions = resolveLinkOptions(tree, options);
        const expectedResolvedOptions: LinkSchema = {
            source: 'liblink',
            target: 'libtarget',
            link: 'shared',
            skipFormat: false,
            sourceProjectRoot: 'packages/link',
        };
        expect(resolvedOptions).toStrictEqual(expectedResolvedOptions);
    });
});
