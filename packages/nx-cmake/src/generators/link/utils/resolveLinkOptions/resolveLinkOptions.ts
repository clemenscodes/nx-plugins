import { type Tree, readProjectConfiguration } from '@nx/devkit';
import type { LinkGeneratorSchema, LinkSchema } from '../../schema';
import { getProjectTypeWithTree } from '../../../../utils/generatorUtils/getProjectTypeWithTree/getProjectTypeWithTree';
import { CProjectType } from '../../../../models/types';

export const resolveLinkOptions = (
    tree: Tree,
    options: LinkGeneratorSchema
): LinkSchema => {
    const { source, target } = options;
    const targetProjectType = getProjectTypeWithTree(tree, target);
    if (targetProjectType !== CProjectType.Lib) {
        throw Error(`Project ${target} is not a library and not linkable`);
    }
    const sourceProjectConfig = readProjectConfiguration(tree, source);
    const sourceProjectRoot = sourceProjectConfig.root;
    const resolvedOptions: LinkSchema = { ...options, sourceProjectRoot };
    return resolvedOptions;
};
