import type { LinkGeneratorSchema } from '@/config';
import type { Tree } from '@nx/devkit';
import { resolveLinkOptions } from '../resolveLinkOptions/resolveLinkOptions';
import { updateCmakeFile } from '../updateCmakeFile/updateCmakeFile';
import { updateIncludeFile } from '../updateIncludeFile/updateIncludeFile';

export async function linkGenerator(tree: Tree, options: LinkGeneratorSchema) {
    const resolvedOptions = resolveLinkOptions(tree, options);
    updateCmakeFile(tree, resolvedOptions);
    updateIncludeFile(tree, resolvedOptions);
}
