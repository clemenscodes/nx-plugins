import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '@/types';
import { BinSchema } from '../../generator';
import { getProjectTargets } from '../../../utils/getProjectTargets/getProjectTargets';
import { addProjectRootToSubDirectories } from '../../../utils/addProjectRootToSubDirectories/addProjectRootToSubDirectories';

export const addBinProject = (tree: Tree, options: BinSchema) => {
    const { name, projectRoot, languageExtension } = options;
    const targets = getProjectTargets(CProjectType.App);
    addProjectConfiguration(tree, name, {
        root: projectRoot,
        projectType: 'application',
        sourceRoot: `${projectRoot}/src`,
        tags: [languageExtension],
        targets,
    });
    addProjectRootToSubDirectories(tree, projectRoot);
};
