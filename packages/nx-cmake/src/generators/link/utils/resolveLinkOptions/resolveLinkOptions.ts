import { Tree, readProjectConfiguration } from '@nx/devkit';
import type { LinkGeneratorSchema, LinkSchema } from '../../schema';

export const resolveLinkOptions = (
    tree: Tree,
    options: LinkGeneratorSchema
): LinkSchema => {
    const { source } = options;
    const sourceProjectConfig = readProjectConfiguration(tree, source);
    const sourceProjectRoot = sourceProjectConfig.root;
    const resolvedOptions: LinkSchema = { ...options, sourceProjectRoot };
    return resolvedOptions;
};
