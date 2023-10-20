import type { LinkGeneratorSchema } from '@/config';
import type { Tree } from '@nx/devkit';
import { resolveLinkOptions } from '../resolveLinkOptions/resolveLinkOptions';
import { updateIncludeFile } from '../updateIncludeFile/updateIncludeFile';
import { updateCmakeFile } from '../updateCmakeFile/updateCmakeFile';

export function linkGenerator(tree: Tree, options: LinkGeneratorSchema) {
    const resolvedOptions = resolveLinkOptions(tree, options);
    updateCmakeFile(tree, resolvedOptions);
    updateIncludeFile(tree, resolvedOptions);
}
