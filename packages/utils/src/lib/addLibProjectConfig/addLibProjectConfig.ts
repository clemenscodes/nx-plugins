import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';
import { LibSchema } from '@/config';
import { CProjectType } from '@/types';
import { getProjectTargets } from '../getProjectTargets/getProjectTargets';
import { addProjectRootToSubDirectories } from '../addProjectRootToSubDirectories/addProjectRootToSubDirectories';

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
