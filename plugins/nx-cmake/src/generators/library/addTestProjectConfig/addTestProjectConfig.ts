import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '@/types';
import { getWorkspaceLayout } from '@/util';
import { LibSchema } from '../../generator';
import { getProjectTargets } from '../../../utils/getProjectTargets/getProjectTargets';
import { addProjectRootToSubDirectories } from '../../../utils/addProjectRootToSubDirectories/addProjectRootToSubDirectories';

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
