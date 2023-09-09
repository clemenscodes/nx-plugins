import { Tree, readNxJson } from '@nx/devkit';

export const getProjectRoot = (tree: Tree, projectName: string): string => {
    const { workspaceLayout } = readNxJson(tree);

    if (!workspaceLayout) {
        return `bin/${projectName}`;
    }

    const { appsDir, projectNameAndRootFormat } = workspaceLayout;
    const derivedProjectRoot = `${appsDir}/${projectName}`;

    if (!projectNameAndRootFormat) {
        return derivedProjectRoot;
    }

    return projectNameAndRootFormat === 'as-provided'
        ? projectName
        : derivedProjectRoot;
};
