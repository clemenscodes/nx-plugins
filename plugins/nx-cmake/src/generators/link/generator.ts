import type { Tree } from '@nx/devkit';
import type { LinkGeneratorSchema } from './schema';
import { resolveLinkOptions } from './utils/resolveLinkOptions/resolveLinkOptions';
import { updateCmakeFile } from './utils/updateCmakeFile/updateCmakeFile';
import { updateIncludeFile } from './utils/updateIncludeFile/updateIncludeFile';

export async function linkGenerator(tree: Tree, options: LinkGeneratorSchema) {
    const resolvedOptions = resolveLinkOptions(tree, options);
    updateCmakeFile(tree, resolvedOptions);
    updateIncludeFile(tree, resolvedOptions);
}

export default linkGenerator;
