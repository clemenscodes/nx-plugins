import type { Tree } from '@nx/devkit';
import type { BinSchema } from '@/config';
import { addProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '@/config';
import { getProjectTargets } from '../getProjectTargets/getProjectTargets';
import { addProjectToProjects } from '../addProjectToProjects/addProjectToProjects';

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
    addProjectToProjects(tree, name, projectRoot);
};
