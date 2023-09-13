import { Tree, addProjectConfiguration } from '@nx/devkit';
import { BinSchema } from '../../schema';
import { getProjectTargets } from '../../../../utils/generatorUtils/getProjectTargets/getProjectTargets';
import { CProjectType } from '../../../../models/types';

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
};
