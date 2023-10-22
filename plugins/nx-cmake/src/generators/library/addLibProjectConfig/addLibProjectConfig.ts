import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '@/types';
import { LibSchema } from '../../generator';
import { getProjectTargets } from '../../../utils/getProjectTargets/getProjectTargets';
import { addProjectRootToSubDirectories } from '../../../utils/addProjectRootToSubDirectories/addProjectRootToSubDirectories';

export const addLibProjectConfig = (
    tree: Tree,
    resolvedLibOptions: LibSchema,
) => {
    const { projectRoot, libName, languageExtension } = resolvedLibOptions;
    const targets = getProjectTargets(CProjectType.Lib);
    addProjectConfiguration(tree, libName, {
        root: projectRoot,
        projectType: 'library',
        sourceRoot: `${projectRoot}/src`,
        tags: [languageExtension],
        targets,
    });
    addProjectRootToSubDirectories(tree, projectRoot);
};
