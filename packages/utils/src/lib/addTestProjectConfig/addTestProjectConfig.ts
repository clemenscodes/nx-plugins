import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';
import { CProjectType, LibSchema } from '@/config';
import { getWorkspaceLayout } from '../getWorkspaceLayout/getWorkspaceLayout';
import { getProjectTargets } from '../getProjectTargets/getProjectTargets';
import { addProjectToProjects } from '../addProjectToProjects/addProjectToProjects';

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
    addProjectToProjects(tree, testName, root);
};
