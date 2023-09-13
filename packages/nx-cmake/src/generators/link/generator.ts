import { formatFiles, type Tree } from '@nx/devkit';
import type { LinkGeneratorSchema } from './schema';
import { resolveLinkOptions } from './utils/resolveLinkOptions/resolveLinkOptions';
import { updateCmakeFile } from './utils/updateCmakeFile/updateCmakeFile';
import { updateIncludeFile } from './utils/updateIncludeFile/updateIncludeFile';

export async function linkGenerator(tree: Tree, options: LinkGeneratorSchema) {
    const resolvedOptions = resolveLinkOptions(tree, options);
    const { skipFormat } = resolvedOptions;
    updateCmakeFile(tree, resolvedOptions);
    updateIncludeFile(tree, resolvedOptions);
    skipFormat || (await formatFiles(tree));
}

export default linkGenerator;
