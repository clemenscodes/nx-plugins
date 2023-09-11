import { Tree, addProjectConfiguration } from '@nx/devkit';
import { LibOptions } from '../../schema';
import { getProjectTargets } from '../../../../utils/generatorUtils/getProjectTargets/getProjectTargets';
import { CProjectType } from '../../../../models/types';

export const addTestProjectConfig = (
    tree: Tree,
    resolvedLibOptions: LibOptions
) => {
    const { projectRoot, testName, languageExtension } = resolvedLibOptions;
    const testTargets = getProjectTargets(CProjectType.Test);
    addProjectConfiguration(tree, testName, {
        root: `${projectRoot}/test`,
        projectType: 'application',
        sourceRoot: `${projectRoot}/src/test`,
        tags: [languageExtension],
        targets: testTargets,
    });
};
