import type { Tree } from '@nx/devkit';
import type { LibOptions } from '../../schema';
import { addProjectConfiguration } from '@nx/devkit';
import { getProjectTargets } from '../../../../utils/generatorUtils/getProjectTargets/getProjectTargets';
import { CProjectType } from '../../../../models/types';

export const addTestProjectConfig = (
    tree: Tree,
    resolvedLibOptions: LibOptions,
): void => {
    if (!resolvedLibOptions.generateTests) {
        return;
    }
    const { projectRoot, testName, languageExtension } = resolvedLibOptions;
    const testTargets = getProjectTargets(CProjectType.Test);
    addProjectConfiguration(tree, testName, {
        root: `${projectRoot}/test`,
        projectType: 'application',
        sourceRoot: `${projectRoot}/test/src`,
        tags: [languageExtension, 'test'],
        targets: testTargets,
    });
};
