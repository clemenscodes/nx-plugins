import type { Tree } from '@nx/devkit';
import type { LibOptions } from '@/config';
import { addProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '@/config';
import { getProjectTargets } from '../getProjectTargets/getProjectTargets';

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
