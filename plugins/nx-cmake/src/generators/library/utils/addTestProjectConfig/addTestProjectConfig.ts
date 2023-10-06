import type { Tree } from '@nx/devkit';
import type { LibOptions } from '../../schema';
import { addProjectConfiguration } from '@nx/devkit';
import { getProjectTargets } from '../../../../utils/generatorUtils/getProjectTargets/getProjectTargets';
import { CProjectType } from '@/types';
import { getWorkspaceLayout } from '../../../../utils/generatorUtils/getWorkspaceLayout/getWorkspaceLayout';

export const addTestProjectConfig = (
    tree: Tree,
    resolvedLibOptions: LibOptions,
): void => {
    if (!resolvedLibOptions.generateTests) {
        return;
    }
    const { appsDir } = getWorkspaceLayout();
    const { testName, languageExtension } = resolvedLibOptions;
    const testTargets = getProjectTargets(CProjectType.Test);
    addProjectConfiguration(tree, testName, {
        root: `${appsDir}/${testName}`,
        projectType: 'application',
        sourceRoot: `${appsDir}/${testName}/src`,
        tags: [languageExtension, 'test'],
        targets: testTargets,
    });
};
