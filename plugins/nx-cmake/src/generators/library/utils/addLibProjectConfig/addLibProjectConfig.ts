import type { Tree } from '@nx/devkit';
import type { LibOptions } from '../../schema';
import { addProjectConfiguration } from '@nx/devkit';
import { getProjectTargets } from '../../../../utils/generatorUtils/getProjectTargets/getProjectTargets';
import { CProjectType } from '@/types';

export const addLibProjectConfig = (
    tree: Tree,
    resolvedLibOptions: LibOptions,
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
