import type { Tree } from '@nx/devkit';
import { readProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '@/types';
import { getProjectTypeWithTree } from '@/util';
import { LinkGeneratorSchema, LinkSchema } from '../../generators/generator';

export const resolveLinkOptions = (
    tree: Tree,
    options: LinkGeneratorSchema,
): LinkSchema => {
    const { source, target } = options;
    const targetProjectType = getProjectTypeWithTree(tree, target);
    if (targetProjectType !== CProjectType.Lib) {
        throw Error(`Project ${target} is not a library and not linkable`);
    }
    const sourceProjectConfig = readProjectConfiguration(tree, source);
    const targetProjectConfig = readProjectConfiguration(tree, target);
    const sourceProjectRoot = sourceProjectConfig.root;
    const targetProjectRoot = targetProjectConfig.root;
    const resolvedOptions: LinkSchema = {
        ...options,
        sourceProjectRoot,
        targetProjectRoot,
    };
    return resolvedOptions;
};
