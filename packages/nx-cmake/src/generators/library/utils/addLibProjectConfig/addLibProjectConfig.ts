import { Tree, addProjectConfiguration } from '@nx/devkit';
import { LibOptions } from '../../schema';
import { getProjectTargets } from '../../../../utils/generatorUtils/getProjectTargets/getProjectTargets';
import { CProjectType } from '../../../../models/types';

export const addLibProjectConfig = (
    tree: Tree,
    resolvedLibOptions: LibOptions
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
};
