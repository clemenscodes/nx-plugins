import { formatFiles, type Tree } from '@nx/devkit';
import type { LinkGeneratorSchema } from './schema';
import { linkLibrary } from './utils/linkLibrary/linkLibrary';
import { resolveLinkOptions } from './utils/resolveLinkOptions/resolveLinkOptions';

export async function linkGenerator(tree: Tree, options: LinkGeneratorSchema) {
    const resolvedOptions = resolveLinkOptions(tree, options);
    const { skipFormat } = resolvedOptions;
    linkLibrary(tree, resolvedOptions);
    skipFormat || (await formatFiles(tree));
}

export default linkGenerator;
