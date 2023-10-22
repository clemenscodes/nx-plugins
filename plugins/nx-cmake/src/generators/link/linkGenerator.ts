import type { Tree } from '@nx/devkit';
import { updateCmakeConfigInFile } from './updateCmakeConfigInFile/updateCmakeConfigInFile';
import { updateCmakeFile } from './updateCmakeFile/updateCmakeFile';
import { LinkGeneratorSchema } from '../generator';
import { resolveLinkOptions } from './resolveLinkOptions/resolveLinkOptions';
import { updateIncludeFile } from './updateIncludeFile/updateIncludeFile';

export function linkGenerator(tree: Tree, options: LinkGeneratorSchema) {
    const resolvedOptions = resolveLinkOptions(tree, options);
    updateCmakeFile(tree, resolvedOptions);
    updateCmakeConfigInFile(tree, resolvedOptions);
    updateIncludeFile(tree, resolvedOptions);
}

export default linkGenerator;
