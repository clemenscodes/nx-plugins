import { Tree, readProjectConfiguration } from '@nx/devkit';
import type { LinkGeneratorSchema, LinkSchema } from '../../schema';

export const resolveLinkOptions = (
    tree: Tree,
    options: LinkGeneratorSchema
): LinkSchema => {
    const { target } = options;
    const targetProjectConfig = readProjectConfiguration(tree, target);
    const targetProjectRoot = targetProjectConfig.root;
    const resolvedOptions: LinkSchema = { ...options, targetProjectRoot };
    return resolvedOptions;
};
