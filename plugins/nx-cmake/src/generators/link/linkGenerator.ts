import type { Tree } from '@nx/devkit';
import { LinkGeneratorSchema } from '../../config';
import { resolveLinkOptions } from '../../utils/resolveLinkOptions/resolveLinkOptions';
import { updateCmakeConfigInFile } from '../../utils/updateCmakeConfigInFile/updateCmakeConfigInFile';
import { updateCmakeFile } from '../../utils/updateCmakeFile/updateCmakeFile';
import { updateIncludeFile } from '../../utils/updateIncludeFile/updateIncludeFile';

export function linkGenerator(tree: Tree, options: LinkGeneratorSchema) {
    const resolvedOptions = resolveLinkOptions(tree, options);
    updateCmakeFile(tree, resolvedOptions);
    updateCmakeConfigInFile(tree, resolvedOptions);
    updateIncludeFile(tree, resolvedOptions);
}

export default linkGenerator;
