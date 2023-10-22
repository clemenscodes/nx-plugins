import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';
import { LibSchema } from '@/config';
import { CProjectType } from '@/types';
import { getProjectTargets } from '../getProjectTargets/getProjectTargets';
import { addProjectRootToSubDirectories } from '../addProjectRootToSubDirectories/addProjectRootToSubDirectories';
import { getWorkspaceLayout } from '@/util';

export const addTestProjectConfig = (
    tree: Tree,
    resolvedLibOptions: LibSchema,
): void => {
    if (!resolvedLibOptions.generateTests) {
        return;
    }
    const { appsDir } = getWorkspaceLayout();
    const { testName, languageExtension } = resolvedLibOptions;
    const testTargets = getProjectTargets(CProjectType.Test);
    const root = `${appsDir}/${testName}`;
    const sourceRoot = `${root}/src`;
    addProjectConfiguration(tree, testName, {
        root,
        projectType: 'application',
        sourceRoot,
        tags: [languageExtension, 'test'],
        targets: testTargets,
    });
    addProjectRootToSubDirectories(tree, root);
};
